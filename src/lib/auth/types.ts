import { z } from 'zod';

export type TokenPayload = {
    id: string;
    email: string;
    name: string;
};

export type User = {
    id: string;
    email: string;
    name: string;
};

export const SignupFormSchema = z
    .object({
        name: z
            .string()
            .min(2, { message: 'Name must be at least 2 characters long.' })
            .trim(),
        email: z
            .string()
            .email({ message: 'Please enter a valid email.' })
            .trim(),
        password: z
            .string()
            .min(8, { message: 'Be at least 8 characters long' })
            .regex(/[a-zA-Z]/, { message: 'Contain at least one letter.' })
            .regex(/[0-9]/, { message: 'Contain at least one number.' })
            .regex(/[^a-zA-Z0-9]/, {
                message: 'Contain at least one special character.',
            })
            .trim(),
        confirmPassword: z.string(),
    })
    .refine((schema) => schema.password === schema.confirmPassword, {
        message: "Passwords don't match",
        path: ['confirmPassword'],
    });

export const LoginFormSchema = z.object({
    email: z.string().email({ message: 'Please enter a valid email.' }),
    password: z
        .string()
        .min(1, { message: 'Password field must not be empty.' }),
});

export type SessionPayload = {
    userId: string;
    expiresAt: Date;
};

export type SignUpFormState =
    | {
          errors?: {
              name?: string[];
              email?: string[];
              password?: string[];
              confirmPassword?: string[];
          };
          message?: string;
      }
    | undefined;
