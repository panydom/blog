import { clientSupabaseInstance } from './supabase'

export async function getIndexPageData() {
    const { data, error, ...args } = await clientSupabaseInstance
        .from('articles')
        .select()

    console.log(data, error, args);

}