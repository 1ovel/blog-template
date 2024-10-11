import Layout from '@/components/Layout';
import { AuthProvider } from '@/contexts/AuthContext';
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'My Blog Template',
    description: 'A Next.js blog template with authentication and PostgreSQL',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <AuthProvider>
                    <Layout>{children}</Layout>
                </AuthProvider>
            </body>
        </html>
    );
}
