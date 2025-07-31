import { transliterate, slugify } from "transliteration";
import { createClientSupabaseClient } from "./supabase";
import { getCurrentUser } from "@/lib/auth";

/**
 * https://supabase.com/docs/reference/javascript/select
 */
export async function getIndexPageData(page: number, size: number = 10) {
    const supabase = await createClientSupabaseClient();
    const { data, error, count } = await supabase
        .from("articles")
        .select("*", { count: "exact" })
        .order("updated_at", { ascending: false })
        .range((page - 1) * size, page * size - 1);

    return {
        data, count: count || 0, error,
    };
}

export type PostData = ResolvedReturnType<typeof getIndexPageData>["data"]

export type PostType = NonNullable<PostData>[0]

export async function getPostDetail(identifier: number | string) {
    // Use .single() to fetch a single record. It's more idiomatic and efficient.
    // It will return an error if no record is found or if multiple are found.
    const supabase = await createClientSupabaseClient();
    // Check if the identifier is a number (ID) or string (slug)
    const isId = typeof identifier === "number" || !isNaN(Number(identifier));
    const { data, error } = await supabase
        .from("articles")
        .select("*")
        .eq(isId ? "id" : "slug", identifier)
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
    const supabase = await createClientSupabaseClient();
    // @ts-expect-error never
    const { error } = await supabase.rpc("increment_view_count", {
        article_id: id,
    });
    if (error) {
        console.error("Error incrementing view count:", error);
    }
    // This function primarily performs an action, so it doesn't need to return data.
    // The caller can check for the absence of an error if needed.
}

/**
 * 获取最新的10篇文章
 * @returns 返回最新的10篇文章列表
 */
export async function getRecentArticles() {
    const supabase = await createClientSupabaseClient();
    const { data, error } = await supabase
        .from("articles")
        .select("id")
        .order("updated_at", { ascending: false })
        .limit(10);

    return { data, error };
}

/**
 * 控制台获取文章
 * @param page 
 * @param size 
 * @returns 
 */
export async function getAllArticles(page: number, size: number = 10) {
    const supabase = await createClientSupabaseClient();
    const { data, error, count } = await supabase
        .from("articles")
        .select("id, title, slug, view_count, created_at, updated_at", { count: "exact" })
        .order("updated_at", { ascending: false })
        .range((page - 1) * size, page * size - 1);

    return {
        data, count: count || 0, error,
    };
}

export async function createArticle(article: { title: string; content: string }) {
    const { data: { user }, isAdmin } = await getCurrentUser();
    if (!user || !isAdmin) {
        throw new Error("无权限");
    }
    const supabase = await createClientSupabaseClient();
    const { data, error } = await supabase
        .from("articles")
        .insert({
            ...article,
            slug: slugify(article.title),
        })
        .select("id, slug")
        .single();
    return { data, error };
}


export async function deleteArticle(id: string) {
    const { data: { user }, isAdmin } = await getCurrentUser();
    if (!user || !isAdmin) {
        throw new Error("无权限");
    }
    const supabase = await createClientSupabaseClient();
    const { error } = await supabase
        .from("articles")
        .delete()
        .eq("id", parseInt(id, 10));
    return { error };
}