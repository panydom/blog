import { clientSupabaseInstance } from './supabase'
/**
 * https://supabase.com/docs/reference/javascript/select
 */
export async function getIndexPageData(page: number, size: number = 10,) {
    const { data, error, count = 0, ...args } = await clientSupabaseInstance
        .from('articles')
        .select("*", { count: "exact" })
        .range((page - 1) * size, page * size)

    return {
        data, count: count || 0
    }
}



export type PostData = ResolvedReturnType<typeof getIndexPageData>['data']