
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_KEY!;

export const clientSupabaseInstance = createClient(supabaseUrl, supabaseKey, {
    auth: {
        autoRefreshToken: true,
        persistSession: true,
        storageKey: "supebase.auth.token"
    },
    global: {
        headers: {
            "X-Client-Marker": "zhu-yu-mo"
        }
    }
})