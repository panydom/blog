"use client";

import {
    Pagination as ShadcnPagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { useMemo } from "react";

export interface PaginationProps {
    page: number;
    size: number;
    count: number;
}

function getOtherPage(left: number, right: number) {
    const items = [];
    let hasEllipsis = false;
    for (let index = left; index < right + 1; index++) {
        let item = null;
        const isEdge = index === left || index === right;
        if (!isEdge && hasEllipsis) {
            continue;
        }
        else {
            item = isEdge ? <PaginationLink href={"?page=" + index}>{index}</PaginationLink> : <PaginationEllipsis />;
            if (!isEdge) {
                hasEllipsis = true;
            }
            items.push((
                <PaginationItem key={`previous-${index}`}>{item}</PaginationItem>
            ));
        }

    }
    return items;
}

export function Pagination({ page, size, count }: PaginationProps) {

    const num = useMemo(() => Math.ceil(count / size), [count, size]);
    const previous = useMemo(() => getOtherPage(1, page - 1), [page]);
    const next = useMemo(() => getOtherPage(page + 1, num), [page, num]);

    return (
        <ShadcnPagination className="mt-4">
            <PaginationContent>
                <PaginationItem>
                    {
                        page > 1 && (
                            <PaginationPrevious href={"?page=" + Math.max(1, page - 1)} label="上一页" />
                        )
                    }
                </PaginationItem>
                {previous}
                <PaginationItem>
                    <PaginationLink href="#" isActive>
                        {page}
                    </PaginationLink>
                </PaginationItem>
                {next}
                <PaginationItem >
                    {
                        page < num && (
                            <PaginationNext href={"?page=" + Math.min((page + 1), num)} label="下一页" />
                        )
                    }
                </PaginationItem>
            </PaginationContent>
        </ShadcnPagination>
    );
}
