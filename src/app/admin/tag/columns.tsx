"use client";
import { ColumnDef } from "@tanstack/react-table";
import type { TagType } from "@/lib/tags";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Pencil, Trash } from "lucide-react";
import DeleteDialog from "@/components/common/delete-dialog";
import { AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { formatTime } from "@/lib/utils";
import OverflowEllipsis from "@/components/common/overflow-ellipsis";
import CreateTag from "./create-tag";
import { DialogTrigger } from "@/components/ui/dialog";

export const columns: ColumnDef<TagType>[] = [
    {
        accessorKey: "id",
        header: "ID",
    },
    {
        accessorKey: "name",
        header: "标签名",
        cell: info => (<OverflowEllipsis content={info.getValue() as string} />),
    },
    {
        accessorKey: "description",
        header: "描述",
        cell: info => (<OverflowEllipsis content={info.getValue() as string} />),
    },
    {
        accessorKey: "view_count",
        header: "关联数量",
    },
    {
        accessorKey: "created_at",
        header: "创建时间",
        cell: info => formatTime(info.getValue() as string),
    },
    {
        accessorKey: "updated_at",
        header: "更新时间",
        cell: info => formatTime(info.getValue() as string),
    },
    {
        id: "actions",
        header: "操作",
        cell: ({ row }) => {
            async function handleDelete() {
                try {
                    const response = await fetch(`/api/tags/${row.original.id}`, {
                        method: "DELETE",
                    });
                    const res = await response.json();
                    if (res.success) {
                        toast.success(res.message);
                        location.reload();
                    } else {
                        toast.error(res.message);
                    }
                }
                catch {
                    toast.error("删除失败");
                }
            }

            return (
                <DeleteDialog
                    title="是否确认删除该标签"
                    description='重要提醒：删除后将无法恢复'
                    onConfirm={handleDelete}
                >
                    <CreateTag isEdit tag={row.original}>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                    <span className="sr-only">打开菜单</span>
                                    <MoreHorizontal className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel className='px-2 py-1.5 text-sm font-semibold'>操作</DropdownMenuLabel>
                                <DialogTrigger asChild>
                                    <DropdownMenuItem>
                                        <Pencil></Pencil><span>编辑</span>
                                    </DropdownMenuItem>
                                </DialogTrigger>
                                <AlertDialogTrigger asChild>
                                    <DropdownMenuItem className='text-red-500 hover:text-red-500'>
                                        <Trash style={{ color: "currentColor" }}></Trash><span>删除</span>
                                    </DropdownMenuItem>
                                </AlertDialogTrigger>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </CreateTag>
                </DeleteDialog>
            );
        },
    },
];