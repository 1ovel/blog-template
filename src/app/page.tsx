import Link from 'next/link';
import Image from 'next/image';
import PostsList from '../components/PostsList';
import { getPosts, Post } from '../utils/postUtils';

export default async function Home() {
    return (
        <main className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Latest Posts</h1>
            <PostsList />
        </main>
    );
}
