'use server';
import { z } from 'zod';
import { createClientSupabaseClient, createServerSupabaseClient } from './supabase';
// import { cookies } from 'next/headers';
// import {NextResponse} from 'next/server'

export async function getCurrentUser() {
    const supabase = await createServerSupabaseClient();
    const { data, error } = await supabase.auth.getUser();
    return { data, error, isAdmin: data.user?.email === process.env.ADMIN_EMAIL };
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
            success: true,
        };
    }
    catch (e) {
        if (e instanceof z.ZodError) {
            const messages = JSON.parse(e.message) || [];
            return { message: messages[0]?.message };
        }
        return {
            // @ts-expect-error message is null
            message: e?.message || 'Unknow Error',
        };
    }
}

export async function SignIn(formData: FormData) {
    try {
        const supabase = await createServerSupabaseClient();
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
            success: true,
        };
    }
    catch (e) {
        // @ts-expect-error message is null
        return { message: e?.message || 'Unknow Error' };
    }

}

export async function SignOut() {
    const supabase = await createServerSupabaseClient();
    const { error } = await supabase.auth.signOut({ scope: 'local' });

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

export async function checkSessionAndRefresh() {
    const supabase = await createServerSupabaseClient();
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.expires_at) {
        return null;
    }
    const expireAt = new Date(session.expires_at * 1000);
    const now = Date.now();
    // 不足5分钟，需要刷新
    if (expireAt.getTime() - now < 5 * 60 * 1000) {
        const { data, error } = await supabase.auth.refreshSession();
        if (error) {
            return null;
        }
        return data.session;
    }
    return session;
}