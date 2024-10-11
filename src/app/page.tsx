import Link from 'next/link';
import Image from 'next/image';
import { PrismaClient } from '@prisma/client';

interface Post {
    id: number;
    title: string;
    imageUrl?: string;
    author: {
        name: string;
    };
}

const prisma = new PrismaClient();

async function getPosts(): Promise<Post[]> {
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

export default async function Home() {
    const posts = await getPosts();

    return (
        <>
            <h1 className="text-3xl font-bold mb-4">Latest Blog Posts</h1>
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
                        <h2 className="text-xl font-semibold mb-2">
                            {post.title}
                        </h2>
                        <p className="text-zinc-500 mb-2">
                            By {post.author.name}
                        </p>
                        <Link
                            href={`/post/${post.id}`}
                            className="text-blue-500 hover:underline"
                        >
                            Read more
                        </Link>
                    </div>
                ))}
            </div>
        </>
    );
}
