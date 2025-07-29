import { cookies } from 'next/headers';
import { createClient } from '@supabase/supabase-js';
import { createBrowserClient, createServerClient } from '@supabase/ssr';
import type { Database } from '@/types/database';


const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_KEY!;

export const createClientSupabaseClient = async () => {
    return createClient<Database>(supabaseUrl, supabaseKey, {
        auth: {
            autoRefreshToken: true,
            persistSession: true,
            storageKey: "supebase.auth.token",
        },
        global: {
            headers: {
                "X-Client-Marker": "zhu-yu-mo",
            },
        },
    });
};

export const createSupebaseClient = () => {
    return createBrowserClient(supabaseUrl, supabaseKey);
};

export const createServerSupabaseClient = async () => {
    const cookieStore = await cookies();
    return createServerClient(supabaseUrl, supabaseKey, {
        cookies: {
            get(name: string) {
                return cookieStore.get(name)?.value;
            },
            set(name: string, value: string, options: object) {
                cookieStore.set({ name, value, ...options });
            },
            remove(name: string, options: object) {
                cookieStore.delete({ name, ...options });
            },
        },
    });
};