interface CommentType {
    id: number;
    nickname?: string | null;
    email?: string | null;
    content: string | null;
    created_at: string;
    user_id: string | null;
    article_id: number | null;
}
interface CommentsProps {
    comments: CommentType[];
}

import { formatTime } from "@/lib/utils";
import { cookies } from "next/headers";

export default async function Comments({ comments }: CommentsProps) {
    const cookieStore = await cookies();
    const timezone = cookieStore.get("user-timezone")?.value;

    return (
        <div className="mt-20">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50 mb-4">最新评论</h3>
            {
                comments.length > 0 ? (
                    <div >
                        {comments.map((comment, index) => (
                            <div key={comment.id} className="shadow-lg p-6 rounded-2xl">
                                <p>#{index + 1}</p>
                                <p>用户：{comment.nickname || comment.email}</p>
                                <p className="my-2">评论：{comment.content}</p>
                                <p>时间：{formatTime(comment.created_at, timezone)}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>暂无评论</p>
                )
            }
        </div>
    );
}   