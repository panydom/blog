'use client';
import dayjs from 'dayjs';
import { ColumnDef } from "@tanstack/react-table";
import type { PostType } from '@/lib/articles';
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";


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
            </Tooltip>)
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
        cell: info => dayjs(info.getValue() as string).format('YYYY-MM-DD HH:mm:ss')
    },
    {
        accessorKey: "updated_at",
        header: "更新时间",
        cell: info => dayjs(info.getValue() as string).format('YYYY-MM-DD HH:mm:ss')
    },
];