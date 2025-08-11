import { NextResponse } from "next/server";
import { createComment } from "@/lib/comment";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { nickname, content, article_id } = body;

        await createComment(nickname, content, article_id);

        return NextResponse.json({
            success: true,
            message: "评论成功",
        }, { status: 200 });
    }
    catch (e) {
        return NextResponse.json({
            success: false,
            // @ts-expect-error empty error
            message: "评论失败:" + e?.message,
        }, { status: 500 });
    }
}
