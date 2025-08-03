import { NextResponse } from "next/server";
import { createTag } from "@/lib/tags";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { data, error } = await createTag(body);
        if (error) {
            if (error.message.includes("duplicate")) {
                return NextResponse.json({
                    message: "创建失败:标签已存在，试试换个名字",
                    success: false,
                }, { status: 500 });
            }
            throw new Error(error.message);
        }
        return NextResponse.json({
            data,
            message: "创建成功",
            success: true,
        }, { status: 200 });
    }
    catch (e: unknown) {
        return NextResponse.json({
            //@ts-expect-error empty error
            message: "创建失败:" + e?.message,
            success: false,
        }, { status: 500 });
    }
}