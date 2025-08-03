import { NextResponse } from "next/server";
import { queryAllTags } from "@/lib/tags";

export async function GET() {
    const { data: tags, error } = await queryAllTags();
    if (error) {
        return NextResponse.json({
            success: false,
            message: error.message,
        }, { status: 500 });
    }
    return NextResponse.json({
        success: true,
        data: tags,
    }, { status: 200 });
}