
import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/types/database'
const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_KEY!;

export const clientSupabaseInstance = createClient<Database>(supabaseUrl, supabaseKey, {
    // auth: {
    //     autoRefreshToken: true,
    //     persistSession: true,
    //     storageKey: "supebase.auth.token"
    // },
    // global: {
    //     headers: {
    //         "X-Client-Marker": "zhu-yu-mo"
    //     }
    // }
})