import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface Post {
    id: number;
    title: string;
    content: string;
    imageUrl?: string;
    author: {
        name: string;
    };
}

export async function getPosts(): Promise<Post[]> {
    const posts = await prisma.post.findMany({
        include: { author: { select: { name: true } } },
        orderBy: { createdAt: 'desc' },
    });
    return posts.map((post) => ({
        ...post,
        imageUrl: post.imageUrl || undefined,
        author: {
            ...post.author,
            name: post.author.name || '',
        },
    }));
}
