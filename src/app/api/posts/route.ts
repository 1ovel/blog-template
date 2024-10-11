import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { authenticateUser } from '@/lib/auth';

const prisma = new PrismaClient();

export async function GET() {
    try {
        const posts = await prisma.post.findMany({
            include: { author: { select: { name: true } } },
            orderBy: { createdAt: 'desc' },
        });
        return NextResponse.json(posts);
    } catch {
        return NextResponse.json(
            { message: 'Something went wrong' },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    const auth = await authenticateUser(request);
    if (!auth) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { title, content, imageUrl } = await request.json();

    try {
        const post = await prisma.post.create({
            data: { title, content, imageUrl, authorId: auth.id },
        });
        return NextResponse.json(post, { status: 201 });
    } catch {
        return NextResponse.json(
            { message: 'Something went wrong' },
            { status: 500 }
        );
    }
}
