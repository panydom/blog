'use client';
import dayjs from 'dayjs';
import { ColumnDef } from "@tanstack/react-table";
import type { PostType } from '@/lib/articles';
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, View, Pencil, Trash } from "lucide-react";
import DeleteDialog from './delete-dialog';
import { AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { toast } from "sonner";

export const columns: ColumnDef<PostType>[] = [
    {
        accessorKey: "id",
        header: "ID",
    },
    {
        accessorKey: "title",
        header: "标题",
        cell: info => (
            <Tooltip>
                <TooltipTrigger className='overflow-hidden text-ellipsis max-w-full'>
                    {info.getValue() as string}
                </TooltipTrigger>
                <TooltipContent>
                    {info.getValue() as string}
                </TooltipContent>
            </Tooltip>),
    },
    {
        accessorKey: "view_count",
        header: "浏览量",
    },
    {
        accessorKey: "like_count",
        header: "点赞量",
    },
    {
        accessorKey: "comment_count",
        header: "评论量",
    },
    {
        accessorKey: "created_at",
        header: "创建时间",
        cell: info => dayjs(info.getValue() as string).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
        accessorKey: "updated_at",
        header: "更新时间",
        cell: info => dayjs(info.getValue() as string).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
        id: "actions",
        header: "操作",
        cell: ({ row }) => {
            async function handleDelete() {
                try {
                    const response = await fetch(`/api/article/${row.original.id}`, {
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
                    title="是否确认删除该博客"
                    description='重要提醒：删除后将无法恢复'
                    onConfirm={handleDelete}
                >
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">打开菜单</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel className='px-2 py-1.5 text-sm font-semibold'>操作</DropdownMenuLabel>
                            <Link href={"/article/" + row.original.id} target='_blank'>
                                <DropdownMenuItem>
                                    <View ></View><span>查看详情</span>
                                </DropdownMenuItem>
                            </Link>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                <Pencil></Pencil><span>编辑博客</span>
                            </DropdownMenuItem>
                            <AlertDialogTrigger asChild>
                                <DropdownMenuItem className='text-red-500 hover:text-red-500'>
                                    <Trash style={{ color: "currentColor" }}></Trash><span>删除博客</span>
                                </DropdownMenuItem>
                            </AlertDialogTrigger>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </DeleteDialog>
            );
        },
    },
];