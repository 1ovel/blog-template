import { createPost } from '@/lib/posts/actions';
import { useFormState, useFormStatus } from 'react-dom';

function CreatePostForm() {
    const [state, action] = useFormState(createPost, undefined);

    return (
        <form action={action} className="space-y-4">
            <div>
                <label htmlFor="title" className="block mb-2">
                    Title
                </label>
                <input
                    type="text"
                    id="title"
                    className="w-full px-3 py-2 rounded bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-blue"
                />
                {state?.errors?.title && (
                    <p className="text-sm text-red-500">{state.errors.title}</p>
                )}
            </div>
            <div>
                <label htmlFor="content" className="block mb-2">
                    Content
                </label>
                <textarea
                    id="content"
                    className="w-full px-3 py-2 rounded bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-blue"
                    rows={10}
                />
                {state?.errors?.content && (
                    <p className="text-sm text-red-500">
                        {state.errors.content}
                    </p>
                )}
            </div>
            <div>
                <label htmlFor="imageUrl" className="block mb-2">
                    Image URL
                </label>
                <input
                    type="url"
                    id="imageUrl"
                    className="w-full px-3 py-2 rounded bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-blue"
                />
                {state?.errors?.imageUrl && (
                    <p className="text-sm text-red-500">
                        {state.errors.imageUrl}
                    </p>
                )}
            </div>
        </form>
    );
}

export default CreatePostForm;

export function CreateButton() {
    const { pending } = useFormStatus();

    return (
        <button disabled={pending} type="submit" className="mt-4 w-full">
            {pending ? 'Loading...' : 'Create'}
        </button>
    );
}
