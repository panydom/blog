import { createClientSupabaseClient } from "./supabase";

/**
 * 创建文章标签关联
 * @param articleId 
 * @param tagIds 
 * @returns 
 */
export async function createArticleTagRelation(articleId: number, tagIds: number[]) {
    const supabase = await createClientSupabaseClient();
    const { data, error } = await supabase
        .from("article_tags")
        .insert(tagIds.map(tagId => (
            {
                article_id: articleId,
                tag_id: tagId,
                created_at: new Date().toISOString(),
            }
        )));
    return { data, error };
}

/**
 * 删除文章标签关联
 * @param articleId 
 * @param tagIds 
 * @returns 
 */
export async function deleteArticleTagRelation(articleId: number, tagIds: number[]) {
    const supabase = await createClientSupabaseClient();
    const { data, error } = await supabase
        .from("article_tags")
        .delete()
        .eq("article_id", articleId)
        .in("tag_id", tagIds);
    return { data, error };
}
