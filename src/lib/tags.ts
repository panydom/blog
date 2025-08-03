import { createClientSupabaseClient } from "./supabase";
import { getCurrentUser } from "@/lib/auth";

export type TagType = {
    id: number;
    name: string;
    description?: string;
}

/**
 * 控制台获取标签
 * @param page 
 * @param size  
 * @returns 
 */
export async function adminQueryTags({ page, size, search }: { page: number, size: number, search?: string }) {
    const supabase = await createClientSupabaseClient();

    // 创建基础查询
    let query = supabase
        .from("tags")
        .select("id, name, description, created_at, updated_at", { count: "exact" });

    // 如果有搜索词，添加全文搜索条件
    if (search && search.trim()) {
        const searchTerm = search.trim();
        query = query.or(`name.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`);
    }

    // 执行分页查询
    const { data, error, count } = await query
        .order("updated_at", { ascending: false })
        .range((page - 1) * size, page * size - 1);

    return {
        data,
        count: count || 0,
        error,
    };
}


export async function createTag(tag: { name: string; description: string }) {
    const { data: { user }, isAdmin } = await getCurrentUser();
    if (!user || !isAdmin) {
        throw new Error("无权限");
    }
    const supabase = await createClientSupabaseClient();
    const { data, error } = await supabase
        .from("tags")
        .insert({
            ...tag,
            updated_at: new Date().toISOString(),
            created_at: new Date().toISOString(),
        })
        .select("id, name")
        .single();
    return { data, error };
}

export async function tagExists(id: number) {
    const supabase = await createClientSupabaseClient();
    const { data, error } = await supabase
        .from("tags")
        .select("id")
        .eq("id", id)
        .single();
    if (error) {
        return false;
    }
    return data !== null;
}

export async function updateTag(id: number, tag: { name: string; description: string }) {
    const { data: { user }, isAdmin } = await getCurrentUser();
    if (!user || !isAdmin) {
        throw new Error("无权限");
    }
    const supabase = await createClientSupabaseClient();
    const { error } = await supabase
        .from("tags")
        .update({
            ...tag,
            updated_at: new Date().toISOString(),
        })
        .eq("id", id);
    return { error };
}