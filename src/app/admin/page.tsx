import React from 'react';
import Link from 'next/link';
import PostsList from '@/lib/posts/components/PostsList';
import { verifySession } from '@/lib/auth/utils';

export default function AdminPage() {
    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <Link href={'/create-post'} />
            <PostsList />
        </div>
    );
}
