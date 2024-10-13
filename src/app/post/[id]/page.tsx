import Image from 'next/image';
import Link from 'next/link';
import { getPost } from '@/lib/posts/actions';
import { notFound } from 'next/navigation';

async function PostDetail({ params }: { params: { id: string } }) {
    const post = await getPost(params.id);

    if (!post) {
        return notFound();
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-8 text-zinc-50">
            <Link
                href="/"
                className="text-blue-500 hover:underline mb-4 inline-block"
            >
                &larr; Back to Home
            </Link>

            <div>
                <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
                <div className="mb-4">
                    <Image
                        src={post.imageUrl}
                        alt={post.title}
                        width={800}
                        height={400}
                        className="rounded-lg object-cover"
                    />
                </div>
                <p className="mb-4">{post.content}</p>
                <p className="text-sm text-gray-500">
                    Author: {post.author.name}
                </p>
            </div>
        </div>
    );
}

export default PostDetail;
