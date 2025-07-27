'use server';
import { z } from 'zod';
import { createClientSupabaseClient, createServerSupebaseClient } from './supabase';
// import { cookies } from 'next/headers';
// import {NextResponse} from 'next/server'

export async function getCurrentUser() {
    const supabase = await createServerSupebaseClient();
    const { data, error } = await supabase.auth.getUser();
    return { data, error };
}

export type User = ResolvedReturnType<typeof getCurrentUser>['data']['user'];

export async function createAccount(prevState: object, formData: FormData) {
    try {
        const schema = z.object({
            email: z.string().nonempty(),
            password: z.string().min(6),
        });

        const data = schema.parse(Object.fromEntries(formData));
        const supabase = await createClientSupabaseClient();
        const res = await supabase
            .auth.signUp({
                email: data.email,
                password: data.password,
            });
        if (res.error) {
            throw res.error;
        }
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

export async function SignIn(formData: FormData) {
    try {
        const supabase = await createServerSupebaseClient();
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;

        if (!email || !password) {
            return { message: 'Email and password are required.', success: false };
        }
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });
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

export async function SignOut() {
    const supabase = await createServerSupebaseClient();
    const { error } = await supabase.auth.signOut({ scope: 'local' });
    console.log(error);

    if (error) {
        throw error;
    }
}

export async function watchAuthChange(callback: (user: User) => void) {
    const supabase = await createClientSupabaseClient();
    return supabase.auth.onAuthStateChange((event, session) => {
        if (session?.user) {
            callback(session.user);
        }
        else {
            callback(null);
        }
    });
}