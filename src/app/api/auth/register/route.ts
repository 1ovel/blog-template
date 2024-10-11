import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { hashPassword, generateToken } from '@/lib/auth';

const prisma = new PrismaClient();

export async function POST(request: Request) {
    const { email, password, name } = await request.json();

    try {
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return NextResponse.json(
                { message: 'User already exists' },
                { status: 400 }
            );
        }

        const hashedPassword = await hashPassword(password);
        const user = await prisma.user.create({
            data: { email, password: hashedPassword, name },
        });

        const token = generateToken(user);
        return NextResponse.json(
            {
                token,
                user: { id: user.id, email: user.email, name: user.name },
            },
            { status: 201 }
        );
    } catch {
        return NextResponse.json(
            { message: 'Something went wrong' },
            { status: 500 }
        );
    }
}
