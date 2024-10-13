'use server';

import prisma from '../database/prisma';
import { NewPostFormSchema, NewPostFormState, PostWithAuthor } from './types';
import { verifySession } from '../auth/utils';
import { redirect } from 'next/navigation';

export async function getPosts(): Promise<PostWithAuthor[]> {
    const posts = await prisma.post.findMany({
        include: { author: { select: { name: true, id: true } } },
        orderBy: { createdAt: 'desc' },
    });
    return posts;
}

export async function getPost(id: string): Promise<PostWithAuthor | null> {
    const post = await prisma.post.findFirst({
        where: { id: id },
        include: { author: { select: { name: true, id: true } } },
    });

    return post;
}

export async function createPost(
    state: NewPostFormState,
    formData: FormData
): Promise<NewPostFormState> {
    const session = await verifySession();

    const validatedFields = NewPostFormSchema.safeParse({
        title: formData.get('title'),
        content: formData.get('content'),
        imageUrl: formData.get('imageUrl'),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }

    const { title, content, imageUrl } = validatedFields.data;

    const post = await prisma.post.create({
        data: { title, content, imageUrl, authorId: session.userId },
    });

    if (!post) {
        return {
            message: 'An error occurred while creating new post.',
        };
    }

    redirect('/admin');
}
