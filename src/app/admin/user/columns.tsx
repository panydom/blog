"use client";
import { ColumnDef } from "@tanstack/react-table";
import type { UserType } from "@/lib/user";
import { formatTime } from "@/lib/utils";
import OverflowEllipsis from "@/components/common/overflow-ellipsis";

export const columns: ColumnDef<UserType>[] = [
    {
        accessorKey: "id",
        header: "ID",
        cell: info => (<OverflowEllipsis content={info.getValue() as string} />),
    },
    {
        accessorKey: "name",
        header: "用户名",
    },
    {
        accessorKey: "email",
        header: "邮箱",
        cell: info => (<OverflowEllipsis content={info.getValue() as string} />),
    },
    {
        accessorKey: "phone",
        header: "手机号",
    },
    {
        accessorKey: "created_at",
        header: "创建时间",
        cell: info => formatTime(info.getValue() as string),
    },
    {
        accessorKey: "last_sign_in_at",
        header: "最后一次登录时间",
        cell: info => formatTime(info.getValue() as string),
    },
];