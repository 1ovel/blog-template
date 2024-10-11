'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { LogOut, PenSquare, User, UserPlus } from 'lucide-react';

interface LayoutProps {
    children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    const router = useRouter();
    const { user, logout } = useAuth();

    const handleLogout = () => {
        logout();
        router.push('/');
    };

    return (
        <div className="min-h-screen flex flex-col bg-zinc-950 text-foreground">
            <header className="border-b border-zinc-800">
                <div className="container mx-auto px-4 py-4">
                    <nav className="flex justify-between items-center">
                        <Link
                            href="/"
                            className="text-2xl font-semibold hover:text-primary transition-colors"
                        >
                            My Blog
                        </Link>
                        <div className="flex items-center space-x-2">
                            {user ? (
                                <>
                                    <Link
                                        href="/create-post"
                                        className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                                    >
                                        <PenSquare className="mr-2 h-4 w-4" />
                                        Create Post
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-zinc-800 border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
                                    >
                                        <LogOut className="mr-2 h-4 w-4" />
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link
                                        href="/login"
                                        className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-zinc-800 border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
                                    >
                                        <User className="mr-2 h-4 w-4" />
                                        Login
                                    </Link>
                                    <Link
                                        href="/register"
                                        className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-zinc-800 border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
                                    >
                                        <UserPlus className="mr-2 h-4 w-4" />
                                        Register
                                    </Link>
                                </>
                            )}
                        </div>
                    </nav>
                </div>
            </header>
            <main className="flex-grow container mx-auto px-4 py-8">
                {children}
            </main>
        </div>
    );
}
