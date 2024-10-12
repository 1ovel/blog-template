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
                <div className="container mx-auto px-4 py-4 sm:min-h-20 flex flex-col justify-center">
                    <nav className="flex justify-between items-center">
                        <Link
                            href="/"
                            className="text-2xl font-semibold hover:text-primary transition-colors"
                        >
                            Template
                        </Link>
                        <div className="flex items-center space-x-2">
                            {user && (
                                <>
                                    <button
                                        onClick={handleLogout}
                                        className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-zinc-800 border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 hover:bg-zinc-900"
                                    >
                                        <LogOut className="mr-2 h-4 w-4" />
                                        Logout
                                    </button>
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
