'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import { useAuth } from '@/contexts/AuthContext';

const CreatePost = () => {
    const router = useRouter();
    const { user } = useAuth();
    const [title, setTitle] = React.useState('');
    const [content, setContent] = React.useState('');
    const [imageUrl, setImageUrl] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);

    React.useEffect(() => {
        if (!user) {
            router.push('/login');
        }
    }, [user, router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                router.push('/login');
                return;
            }

            const res = await fetch('/api/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ title, content, imageUrl }),
            });

            if (res.ok) {
                router.push('/');
            } else {
                const data = await res.json();
                alert(data.message);
            }
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-8 text-zinc-50">
            <h1 className="text-3xl font-bold mb-4">Create New Post</h1>
            <form onSubmit={handleSubmit} className="max-w-2xl">
                <div className="mb-4">
                    <label htmlFor="title" className="block mb-2">
                        Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        className="w-full px-3 py-2 rounded bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-blue"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="imageUrl" className="block mb-2">
                        Image URL
                    </label>
                    <input
                        type="url"
                        id="imageUrl"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        className="w-full px-3 py-2 rounded  bg-zinc-900 focus:ring-2 focus:ring-blue autofill:bg-zinc-900 autofill:text-zinc-50"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="content" className="block mb-2">
                        Content (Markdown)
                    </label>
                    <textarea
                        id="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                        className="w-full px-3 py-2 rounded h-64 bg-zinc-900 focus:ring-2 focus:ring-blue"
                    />
                </div>
                <div className="mb-4">
                    <h3 className="text-lg font-semibold mb-2">Preview</h3>
                    <div className="rounded border border-zinc-800 p-4">
                        <ReactMarkdown>{content}</ReactMarkdown>
                    </div>
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded flex items-center justify-center"
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <>
                            <svg
                                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                ></circle>
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                            </svg>
                            Creating Post...
                        </>
                    ) : (
                        'Create Post'
                    )}
                </button>
            </form>
        </div>
    );
};

export default CreatePost;
