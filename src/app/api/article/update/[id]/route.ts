import { NextResponse } from "next/server";
import { updateArticle, articleExists } from "@/lib/articles";

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        if (!id) {
            return NextResponse.json({
                success: false,
                message: "无效的博客ID",
            }, { status: 400 });
        }
        const articleId = parseInt(id, 10);
        const exists = await articleExists(articleId);
        if (!exists) {
            return NextResponse.json({
                success: false,
                message: "文章不存在",
            }, { status: 404 });
        }
        const body = await request.json();
        const { data, error } = await updateArticle(articleId, body);
        if (error) {
            throw new Error(error.message);
        }
        return NextResponse.json({
            data,
            message: "更新成功",
            success: true,
        }, { status: 200 });
    }
    catch (e: unknown) {
        return NextResponse.json({
            //@ts-expect-error empty error
            message: "更新失败:" + e?.message,
            success: false,
        }, { status: 500 });
    }
}