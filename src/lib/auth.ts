'use server';
import { z } from 'zod';
import { clientSupabaseInstance } from './supabase';

export async function getCurrentUser() {
    const { data, error } = await clientSupabaseInstance.auth.getUser();
    return { data, error };
}

export async function createAccount(prevState: object, formData: FormData) {
    try {
        const schema = z.object({
            email: z.string().nonempty(),
            password: z.string().min(6),
        });

        const data = schema.parse(Object.fromEntries(formData));
        const res = await clientSupabaseInstance
            .auth.signUp({
                email: data.email,
                password: data.password,
            });
        if (res.error) {
            throw res.error;
        }
        console.log(data);

        return {
            message: "Register Success",
            success: true
        };
    }
    catch (e) {
        if (e instanceof z.ZodError) {
            const messages = JSON.parse(e.message) || [];
            return { message: messages[0]?.message };
        }
        return {
            // @ts-expect-error message is null
            message: e?.message || 'Unknow Error'
        };
    }
}

export async function SignIn(prevState: object, formData: FormData) {
    try {
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;

        if (!email || !password) {
            return { message: 'Email and password are required.', success: false };
        }
        const { data, error } = await clientSupabaseInstance.auth.signInWithPassword({
            email,
            password,
        });
        console.log(data, error);
        if (error) {
            throw error;
        }
        return {
            message: 'Login Success',
            success: true
        };
    }
    catch (e) {
        // @ts-expect-error message is null
        return { message: e?.message || 'Unknow Error' };
    }

}