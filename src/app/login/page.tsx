'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

const Login = () => {
    const router = useRouter();
    const { login } = useAuth();
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });
            const data = await res.json();
            if (res.ok) {
                login(data.token);
                router.push('/');
            } else {
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
            <h1 className="text-3xl font-bold mb-4">Login</h1>
            <form onSubmit={handleSubmit} className="max-w-md">
                <div className="mb-4">
                    <label htmlFor="email" className="block mb-2">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full px-3 py-2 rounded bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-blue"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block mb-2">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full px-3 py-2 rounded bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-blue"
                    />
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
                            Logging in...
                        </>
                    ) : (
                        'Login'
                    )}
                </button>
            </form>
        </div>
    );
};

export default Login;
