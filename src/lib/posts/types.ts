import { Post } from '@prisma/client';
import { z } from 'zod';

export interface PostWithAuthor extends Post {
    author: {
        id: string;
        name: string;
    };
}

export const NewPostFormSchema = z.object({
    title: z
        .string()
        .min(2, { message: 'Title must be at least 2 characters long.' })
        .trim(),
    content: z.string().min(1, 'Content should not be empty.').trim(),
    imageUrl: z.string().url('Please enter a valid image URL').trim(),
});

export type NewPostFormState =
    | {
          errors?: {
              title?: string[];
              content?: string[];
              imageUrl?: string[];
          };
          message?: string;
      }
    | undefined;
