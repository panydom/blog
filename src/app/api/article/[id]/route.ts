import { NextResponse } from "next/server";
import { deleteArticle } from "@/lib/articles";

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    if (!id) {
        return NextResponse.json({
            success: false,
            message: "无效的博客ID",
        }, { status: 400 });
    }

    try {
        const { error } = await deleteArticle(id);
        if (error) {
            throw error;
        }
        return NextResponse.json({
            success: true,
            message: "",
        }, { status: 200 });
    }
    catch (e) {
        return NextResponse.json({
            success: false,
            // @ts-expect-error empty error
            message: "删除失败:" + e?.message,
        }, { status: 500 });
    }

}