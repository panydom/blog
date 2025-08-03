import { NextResponse } from "next/server";
import { updateTag, tagExists } from "@/lib/tags";

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        if (!id) {
            return NextResponse.json({
                success: false,
                message: "无效的标签ID",
            }, { status: 400 });
        }
        const tagId = parseInt(id, 10);
        const exists = await tagExists(tagId);
        if (!exists) {
            return NextResponse.json({
                success: false,
                message: "标签不存在",
            }, { status: 404 });
        }
        const body = await request.json();
        const { error } = await updateTag(tagId, body);
        if (error) {
            throw new Error(error.message);
        }
        return NextResponse.json({
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