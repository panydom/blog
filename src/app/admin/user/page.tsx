import { Suspense } from "react";
import DataTable from "@/components/data-table";
import { columns } from "./columns";
import { getUserList } from "@/lib/user";
import { Pagination } from "@/components/common/Pagination";
import { type Metadata } from "next";
import SearchComponent from "@/components/common/search";
import { ProgressBar, ProgressBarProvider } from "react-transition-progress";

export const metadata: Metadata = {
    title: "用户管理",
    description: "用户管理",
};

const size = 10;

const AdminBlogPage = async ({ searchParams }: { searchParams: Promise<{ page: string; search?: string }> }) => {
    const { page } = await searchParams;
    const currentPage = Number(page) || 1;
    const { data, count } = await getUserList({
        page: currentPage,
        size,
    });

    return (
        <>
            {/* <div className="mb-4 flex justify-between">
                <div className="relative">
                    <ProgressBarProvider>
                        <ProgressBar className="absolute h-1 shadow-lg shadow-blue-600/20 bg-blue-600 top-0 " />
                        <SearchComponent query={search || ""} homepage="admin/user" placeholder="通过用户名搜索" />
                    </ProgressBarProvider>
                </div>
            </div> */}
            <DataTable columns={columns} data={data} fixed colgroup={(
                <colgroup>
                    <col className="w-20" />
                    <col className="w-28" />
                    <col className="w-40" />
                    <col className="w-16" />
                    <col className="w-40" />
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

export default AdminBlogPage;