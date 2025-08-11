"use client";
import { ColumnDef } from "@tanstack/react-table";
import type { Comment } from "@/lib/comment";
import { formatTime } from "@/lib/utils";
import OverflowEllipsis from "@/components/common/overflow-ellipsis";

export const columns: ColumnDef<Comment>[] = [
    {
        accessorKey: "id",
        header: "ID",
        cell: info => (<OverflowEllipsis content={info.getValue() as string} />),
    },
    {
        accessorKey: "nickname",
        header: "昵称",
    },
    {
        accessorKey: "email",
        header: "邮箱",
        cell: info => (<OverflowEllipsis content={info.getValue() as string} />),
    },
    {
        accessorKey: "content",
        header: "内容",
    },
    {
        accessorKey: "created_at",
        header: "创建时间",
        cell: info => formatTime(info.getValue() as string),
    },
];