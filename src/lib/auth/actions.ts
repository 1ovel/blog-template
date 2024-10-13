'use server';

import bcrypt from 'bcrypt';
import { LoginFormSchema, SignupFormSchema, SignUpFormState } from './types';
import prisma from '../database/prisma';
import { createSession, deleteSession, verifySession } from './utils';

export async function signup(
    state: SignUpFormState,
    formData: FormData
): Promise<SignUpFormState> {
    const validatedFields = SignupFormSchema.safeParse({
        name: formData.get('name'),
        email: formData.get('email'),
        password: formData.get('password'),
        confirmPassword: formData.get('confirmPassword'),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }

    const { name, email, password } = validatedFields.data;

    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
        return {
            message:
                'Email already exists, please use a different email or login.',
        };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
        data: { email, password: hashedPassword, name },
    });

    if (!user) {
        return {
            message: 'An error occurred while creating your account.',
        };
    }

    const userId = user.id.toString();
    await createSession(userId);
}

export async function login(
    state: SignUpFormState,
    formData: FormData
): Promise<SignUpFormState> {
    const validatedFields = LoginFormSchema.safeParse({
        email: formData.get('email'),
        password: formData.get('password'),
    });
    const errorMessage = { message: 'Invalid login credentials.' };

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }

    const user = await prisma.user.findUnique({
        where: { email: validatedFields.data.email },
    });

    if (!user) {
        return errorMessage;
    }
    const passwordMatch = await bcrypt.compare(
        validatedFields.data.password,
        user.password
    );

    if (!passwordMatch) {
        return errorMessage;
    }

    const userId = user.id.toString();
    await createSession(userId);
}

export async function logout() {
    deleteSession();
}

export const getUser = async () => {
    const session = await verifySession();
    if (!session) return null;

    try {
        const user = await prisma.user.findUnique({
            where: { id: session.userId },
        });

        return user;
    } catch (error) {
        console.log('Failed to fetch user');
        return null;
    }
};
