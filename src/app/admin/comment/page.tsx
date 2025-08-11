import { Suspense } from "react";
import DataTable from "@/components/data-table";
import { columns } from "./columns";
import { getComments } from "@/lib/comment";
import { Pagination } from "@/components/common/Pagination";
import { type Metadata } from "next";

export const metadata: Metadata = {
    title: "用户管理",
    description: "用户管理",
};

const size = 10;

const AdminCommentPage = async ({ searchParams }: { searchParams: Promise<{ page: string; search?: string }> }) => {
    const { page } = await searchParams;
    const currentPage = Number(page) || 1;
    const { data, count } = await getComments({
        page: currentPage,
        size,
    });

    return (
        <>
            <DataTable columns={columns} data={data} fixed colgroup={(
                <colgroup>
                    <col className="w-20" />
                    <col className="w-28" />
                    <col className="w-40" />
                    <col className="w-16" />
                    <col className="w-40" />
                </colgroup>
            )} />
            {
                count > size && (
                    <Suspense fallback={<></>}>
                        <Pagination page={currentPage} size={size} count={count}></Pagination>
                    </Suspense>
                )
            }
        </>
    );
};

export default AdminCommentPage;