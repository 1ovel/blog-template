import { NextResponse } from 'next/server';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
        return NextResponse.json(
            { error: 'Missing email or password' },
            { status: 400 }
        );
    }

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
        return NextResponse.json(
            { error: 'Invalid password' },
            { status: 401 }
        );
    }

    const token = sign(
        { id: user.id, email: user.email, name: user.name },
        process.env.JWT_SECRET!,
        { expiresIn: '1h' }
    );

    return NextResponse.json({ token });
}
