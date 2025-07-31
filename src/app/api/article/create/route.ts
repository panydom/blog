import { NextResponse } from "next/server";
import { createArticle } from "@/lib/articles";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { data, error } = await createArticle(body);
        if (error) {
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