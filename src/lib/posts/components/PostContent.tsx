import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { PostWithAuthor } from '@/lib/posts/types';

export default function PostContent({ post }: { post: PostWithAuthor }) {
    return (
        <div className="max-w-2xl mx-auto">
            <Link
                href="/"
                className="text-blue-500 hover:underline mb-4 inline-block"
            >
                ← Back to Home
            </Link>
            <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
            {post.imageUrl && (
                <div className="relative w-full h-64 mb-4">
                    <Image
                        src={post.imageUrl}
                        alt={post.title}
                        fill
                        style={{ objectFit: 'cover' }}
                    />
                </div>
            )}
            <p className="text-zinc-500 mb-4">By {post.author.name}</p>
            <div
                className="prose"
                dangerouslySetInnerHTML={{ __html: post.content }}
            />
        </div>
    );
}
