import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
}

export async function verifyPassword(
    password: string,
    hashedPassword: string
): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
}

interface TokenPayload {
    id: string;
    email: string;
    name: string | null;
}

export function generateToken(payload: TokenPayload): string {
    return jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: '1d' });
}

export function verifyToken(token: string): TokenPayload {
    return jwt.verify(token, process.env.JWT_SECRET!) as TokenPayload;
}

export async function authenticateUser(
    req: NextRequest
): Promise<{ id: string; email: string; name: string | null } | null> {
    const token = req.headers.get('authorization')?.split(' ')[1];
    if (!token) return null;

    const decoded = verifyToken(token);
    if (!decoded) return null;

    const user = await prisma.user.findUnique({
        where: { id: decoded.id },
        select: { id: true, email: true, name: true },
    });
    if (!user) return null;

    return user;
}
