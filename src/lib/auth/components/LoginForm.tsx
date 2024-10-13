'use client';

import { login } from '@/lib/auth/actions';
import Link from 'next/link';
import { useFormState, useFormStatus } from 'react-dom';

export function LoginForm() {
    const [state, action] = useFormState(login, undefined);

    return (
        <div className="p-8 border border-zinc-800 bg-zinc-900 rounded-lg shadow-md w-full max-w-md text-zinc-50">
            <h2 className="text-2xl font-bold mb-6 text-center">Sign In</h2>
            <form action={action} className="space-y-6">
                <div>
                    <label
                        htmlFor="email"
                        className="block text-sm font-medium"
                    >
                        Email
                    </label>
                    <input
                        id="email"
                        name="email"
                        placeholder="m@example.com"
                        type="email"
                        className="mt-1 block w-full px-3 py-2 bg-zinc-800 border border-zinc-900 rounded-md text-sm shadow-sm placeholder-zinc-500
                                       focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                    />
                    {state?.errors?.email && (
                        <p className="mt-2 text-sm text-red-600">
                            {state.errors.email}
                        </p>
                    )}
                </div>
                <div>
                    {/* <div className="flex items-center justify-between">
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium"
                        >
                            Password
                        </label>
                        <Link
                            className="text-sm text-indigo-600 hover:text-indigo-500"
                            href="#"
                        >
                            Forgot your password?
                        </Link>
                    </div> */}
                    <label
                        htmlFor="password"
                        className="block text-sm font-medium"
                    >
                        Password
                    </label>
                    <input
                        id="password"
                        type="password"
                        name="password"
                        className="mt-1 block w-full px-3 py-2 bg-zinc-800 border border-zinc-900 rounded-md text-sm shadow-sm placeholder-zinc-400
                                       focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                    />
                    {state?.errors?.password && (
                        <p className="mt-2 text-sm text-red-600">
                            {state.errors.password}
                        </p>
                    )}
                </div>
                {state?.message && (
                    <p className="text-sm text-red-600">{state.message}</p>
                )}
                <LoginButton />
            </form>
        </div>
    );
}

export function LoginButton() {
    const { pending } = useFormStatus();

    return (
        <button
            disabled={pending}
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
            {pending ? 'Loading...' : 'Sign In'}
        </button>
    );
}
