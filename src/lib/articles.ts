import { clientSupabaseInstance } from './supabase';
/**
 * https://supabase.com/docs/reference/javascript/select
 */
export async function getIndexPageData(page: number, size: number = 10,) {
    // The `range` method is inclusive. `range(0, 9)` gets 10 items.
    // Also, it's good practice to return the error object for the caller to handle.
    const { data, error, count } = await clientSupabaseInstance
        .from('articles')
        .select("*", { count: "exact" })
        .range((page - 1) * size, page * size - 1);

    return {
        data, count: count || 0, error
    };
}



export type PostData = ResolvedReturnType<typeof getIndexPageData>['data']

export async function getPostDetail(id: number) {
    // Use .single() to fetch a single record. It's more idiomatic and efficient.
    // It will return an error if no record is found or if multiple are found.
    const { data, error } = await clientSupabaseInstance
        .from('articles')
        .select("*")
        .eq('id', id)
        .single();

    return { data, error };
}

/**
 * 将文章的浏览量自增1
 * create or replace function increment_view_count (article_id int)
returns void as
$$
  update public.articles
  set view_count = view_count + 1
  where id = article_id;
$$
language sql volatile;

 * @param id 
 */
export async function incrementViewCount(id: number) {
    // Use the RPC function created in the Supabase SQL Editor for an atomic increment.
    // This prevents race conditions.
    // @ts-expect-error never
    const { error } = await clientSupabaseInstance.rpc('increment_view_count', {
        article_id: id,
    });

    if (error) {
        console.error('Error incrementing view count:', error);
    }
    // This function primarily performs an action, so it doesn't need to return data.
    // The caller can check for the absence of an error if needed.
}

/**
 * 获取最新的10篇文章
 * @returns 返回最新的10篇文章列表
 */
export async function getRecentArticles() {
    const { data, error } = await clientSupabaseInstance
        .from('articles')
        .select('id')
        .order('updated_at', { ascending: false })
        .limit(10);

    return { data, error };
}
