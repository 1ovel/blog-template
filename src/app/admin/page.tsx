'use client';

import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import LoginForm from '@/components/LoginForm';
import PostsList from '../../components/PostsList';
import CreatePostForm from '@/components/CreatePostForm';

export default function AdminPage() {
    const { user } = useAuth();

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            {user ? (
                <>
                    <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
                    <CreatePostForm />
                </>
            ) : (
                <>
                    <h1 className="text-3xl font-bold mb-4">Login</h1>
                    <LoginForm />
                </>
            )}
        </div>
    );
}
