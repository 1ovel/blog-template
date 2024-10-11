import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { verifyToken } from '@/lib/auth';

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    const postId = parseInt(params.id, 10);

    if (isNaN(postId)) {
        return NextResponse.json({ error: 'Invalid post ID' }, { status: 400 });
    }

    try {
        const post = await prisma.post.findUnique({
            where: { id: postId },
            include: { author: { select: { id: true, name: true } } },
        });

        if (!post) {
            return NextResponse.json(
                { error: 'Post not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(post);
    } catch (error) {
        console.error('Error fetching post:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}

export async function PUT(
    request: Request,
    { params }: { params: { id: string } }
) {
    const postId = parseInt(params.id, 10);

    if (isNaN(postId)) {
        return NextResponse.json({ error: 'Invalid post ID' }, { status: 400 });
    }

    const token = request.headers.get('Authorization')?.split(' ')[1];
    if (!token) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const decodedToken = verifyToken(token);
    if (!decodedToken) {
        return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    const { title, content } = await request.json();

    try {
        const post = await prisma.post.findUnique({
            where: { id: postId },
            include: { author: true },
        });

        if (!post) {
            return NextResponse.json(
                { error: 'Post not found' },
                { status: 404 }
            );
        }

        if (post.author.id !== decodedToken.id) {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
        }

        const updatedPost = await prisma.post.update({
            where: { id: postId },
            data: { title, content },
        });

        return NextResponse.json(updatedPost);
    } catch (error) {
        console.error('Error updating post:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    const postId = parseInt(params.id, 10);

    if (isNaN(postId)) {
        return NextResponse.json({ error: 'Invalid post ID' }, { status: 400 });
    }

    const token = request.headers.get('Authorization')?.split(' ')[1];
    if (!token) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const decodedToken = verifyToken(token);
    if (!decodedToken) {
        return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    try {
        const post = await prisma.post.findUnique({
            where: { id: postId },
            include: { author: true },
        });

        if (!post) {
            return NextResponse.json(
                { error: 'Post not found' },
                { status: 404 }
            );
        }

        if (post.author.id !== decodedToken.id) {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
        }

        await prisma.post.delete({
            where: { id: postId },
        });

        return NextResponse.json({
            message: 'Post deleted successfully',
            deletedPostId: postId,
        });
    } catch (error) {
        console.error('Error deleting post:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
