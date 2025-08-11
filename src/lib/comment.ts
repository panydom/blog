"use server";
import { createClientSupabaseClient } from "./supabase";
import { getCurrentUser } from "@/lib/auth";

export async function createComment(nickname: string, content: string, article_id: number) {
    const supabase = await createClientSupabaseClient();
    const { data: { user } } = await getCurrentUser();
    if (!user) {
        throw new Error("用户未登录");
    }

    const { data, error } = await supabase.from("comment").insert({
        nickname,
        content,
        created_at: new Date().toISOString(),
        user_id: user.id,
        article_id,
        email: user.email,
    });
    if (error) {
        throw error;
    }
    return data;
}

export async function getComments({ page, size }: { page: number, size: number }) {
    const supabase = await createClientSupabaseClient();
    const { data, count, error } = await supabase.from("comment")
        .select("*", { count: "exact" })
        .order("created_at", { ascending: false })
        .range((page - 1) * size, page * size - 1);

    if (error) {
        throw error;
    }
    return { data, count: count || 0 };
}

export type Comment = ResolvedReturnType<typeof getComments>["data"][number]