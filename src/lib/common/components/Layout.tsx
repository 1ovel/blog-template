import React from 'react';
import Link from 'next/link';

interface LayoutProps {
    children: React.ReactNode;
}

export async function Layout({ children }: LayoutProps) {
    return (
        <div className="min-h-screen flex flex-col bg-zinc-950">
            <main className="container flex-1 mx-auto px-4 py-8 flex flex-col items-center justify-center">
                {children}
            </main>
        </div>
    );
}
