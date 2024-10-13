import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { decrypt } from '@/lib/auth/utils';

export default async function middleware(req: NextRequest) {
    const path = req.nextUrl.pathname;
    const cookie = cookies().get('session')?.value;
    const session = await decrypt(cookie);

    if (!session?.userId && path.startsWith('/admin')) {
        return NextResponse.redirect(new URL('/login', req.url));
    }
}
