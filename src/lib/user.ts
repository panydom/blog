import { createAdminSupabaseClient } from "./supabase";

interface UserListOptions {
    page?: number;
    size?: number;
}

/** 
 * 获取用户列表
 * @param options 分页选项
 * @returns 用户列表和总数
 */
export async function getUserList(options: UserListOptions = {}) {
    const { page = 1, size = 10 } = options;

    const supabase = await createAdminSupabaseClient();

    // 获取用户总数
    const { data: { users }, error } = await supabase.auth.admin.listUsers({
        page, perPage: size,
    });

    return {
        data: users,
        count: users?.length || 0,
        page,
        size,
    };
}

export type UserType = ResolvedReturnType<typeof getUserList>["data"][number]
