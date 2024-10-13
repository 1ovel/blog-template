import CreatePostForm from '@/lib/posts/components/CreatePostForm';
import React from 'react';

export default function CreatePost() {
    return (
        <div className="max-w-4xl mx-auto px-4 py-8 text-zinc-50">
            <h1 className="text-3xl font-bold mb-4">Create New Post</h1>
            <CreatePostForm />
        </div>
    );
}
