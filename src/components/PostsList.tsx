import React from 'react';
import Link from 'next/link';
import { getPosts, Post } from '../utils/postUtils';
import Image from 'next/image';

export default async function PostsList() {
    const posts = await getPosts();

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {posts.map((post) => (
                <div
                    key={post.id}
                    className="border border-zinc-800 rounded-lg p-4"
                >
                    {post.imageUrl && (
                        <div className="relative w-full h-48 mb-2">
                            <Image
                                src={post.imageUrl}
                                alt={post.title}
                                fill
                                style={{
                                    objectFit: 'cover',
                                    borderRadius: 5,
                                }}
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                        </div>
                    )}
                    <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                    <p className="text-zinc-500 mb-2">By {post.author.name}</p>
                    <Link
                        href={`/post/${post.id}`}
                        className="text-blue-500 hover:underline"
                    >
                        Read more
                    </Link>
                </div>
            ))}
        </div>
    );
}
