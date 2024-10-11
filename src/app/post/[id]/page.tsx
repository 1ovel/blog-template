'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import Image from 'next/image';
import Link from 'next/link';

interface Post {
    id: string;
    title: string;
    content: string;
    imageUrl: string; // Add this line
    author: {
        id: string;
        name: string | null;
    };
}

const PostDetail = ({ params }: { params: { id: string } }) => {
    const router = useRouter();
    const { user } = useAuth();
    const [post, setPost] = useState<Post | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState('');
    const [editedContent, setEditedContent] = useState('');
    const [editedImageUrl, setEditedImageUrl] = useState(''); // Add this line

    useEffect(() => {
        const fetchPost = async () => {
            const res = await fetch(`/api/posts/${params.id}`);
            if (res.ok) {
                const data = await res.json();
                setPost(data);
                setEditedTitle(data.title);
                setEditedContent(data.content);
                setEditedImageUrl(data.imageUrl); // Add this line
            } else if (res.status === 400) {
                console.error('Invalid post ID');
                // Handle invalid ID (e.g., redirect to 404 page)
            } else {
                console.error('Failed to fetch post');
            }
        };
        fetchPost();
    }, [params.id]);

    const handleEdit = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            console.error('No token found');
            return;
        }

        const res = await fetch(`/api/posts/${params.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                title: editedTitle,
                content: editedContent,
                imageUrl: editedImageUrl,
            }),
        });

        if (res.ok) {
            setPost({
                ...post!,
                title: editedTitle,
                content: editedContent,
                imageUrl: editedImageUrl,
            });
            setIsEditing(false);
        } else {
            // Handle error
            console.error('Failed to update post');
        }
    };

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this post?')) {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('No token found');
                return;
            }

            const res = await fetch(`/api/posts/${post?.id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (res.ok) {
                router.push('/');
            } else {
                // Handle error
                console.error('Failed to delete post');
            }
        }
    };

    if (!post) return <></>;

    return (
        <div className="max-w-4xl mx-auto px-4 py-8 text-zinc-50">
            <Link
                href="/"
                className="text-blue-500 hover:underline mb-4 inline-block"
            >
                &larr; Back to Home
            </Link>
            {isEditing ? (
                <div>
                    <input
                        type="text"
                        value={editedTitle}
                        onChange={(e) => setEditedTitle(e.target.value)}
                        className="w-full px-3 py-2 mb-4 rounded bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <textarea
                        value={editedContent}
                        onChange={(e) => setEditedContent(e.target.value)}
                        className="w-full px-3 py-2 mb-4 rounded bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows={10}
                    />
                    <input
                        type="text"
                        value={editedImageUrl}
                        onChange={(e) => setEditedImageUrl(e.target.value)}
                        placeholder="Image URL"
                        className="w-full px-3 py-2 mb-4 rounded bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        onClick={handleEdit}
                        className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                    >
                        Save
                    </button>
                    <button
                        onClick={() => setIsEditing(false)}
                        className="bg-gray-500 text-white px-4 py-2 rounded"
                    >
                        Cancel
                    </button>
                </div>
            ) : (
                <div>
                    <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
                    {post.imageUrl && (
                        <div className="mb-4">
                            <Image
                                src={post.imageUrl}
                                alt={post.title}
                                width={800}
                                height={400}
                                className="rounded-lg object-cover"
                            />
                        </div>
                    )}
                    <p className="mb-4">{post.content}</p>
                    <p className="text-sm text-gray-400">
                        Author: {post.author.name || 'Anonymous'}
                    </p>
                    {user && user.id === post.author.id && (
                        <div className="mt-4">
                            <button
                                onClick={() => setIsEditing(true)}
                                className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                            >
                                Edit
                            </button>
                            <button
                                onClick={handleDelete}
                                className="bg-red-500 text-white px-4 py-2 rounded"
                            >
                                Delete
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default PostDetail;
