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

export interface PaginationComponentProps extends PaginationProps {
    onChange?(page: number): void
}

type OnPageActive = (page: number) => void

function getOtherPage(left: number, right: number, onChange: OnPageActive) {
    const items = [];
    let hasEllipsis = false;
    for (let index = left; index < right + 1; index++) {
        let item = null;
        const isEdge = index === left || index === right;
        if (!isEdge && hasEllipsis) {
            continue;
        }
        else {
            item = isEdge ? <PaginationLink onClick={() => onChange(index)} href="#">{index}</PaginationLink> : <PaginationEllipsis />;
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

export function Pagination({ page, size, count }: PaginationComponentProps) {

    const num = useMemo(() => Math.ceil(count / size), [count, size]);

    const previous = useMemo(() => getOtherPage(1, page - 1, onPageActive), [page]);
    const next = useMemo(() => getOtherPage(page + 1, num, onPageActive), [page, num]);

    function onPageActive(page: number) {
        console.log(page);

    }

    return (
        <ShadcnPagination className="mt-4">
            <PaginationContent>
                <PaginationItem onClick={() => onPageActive(page - 1)}>
                    <PaginationPrevious href="#" label="上一页" />
                </PaginationItem>
                {previous}
                <PaginationItem>
                    <PaginationLink href="#" isActive>
                        {page}
                    </PaginationLink>
                </PaginationItem>
                {next}
                <PaginationItem onClick={() => onPageActive(page + 1)}>
                    <PaginationNext href="#" label="下一页" />
                </PaginationItem>
            </PaginationContent>
        </ShadcnPagination>
    );
}
