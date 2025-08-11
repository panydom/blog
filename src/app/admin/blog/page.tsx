import { Suspense } from "react";
import { Link } from "react-transition-progress/next";
import DataTable from "@/components/data-table";
import { columns } from "./columns";
import { adminQueryArticles } from "@/lib/articles";
import { Button } from "@/components/ui/button";
import { Pagination } from "@/components/common/Pagination";
import { type Metadata } from "next";
import SearchComponent from "@/components/common/search";
import { ProgressBar, ProgressBarProvider } from "react-transition-progress";

export const metadata: Metadata = {
    title: "博客管理",
    description: "博客管理",
};

const size = 10;

const AdminBlogPage = async ({ searchParams }: { searchParams: Promise<{ page: string; search?: string }> }) => {
    const { search, page } = await searchParams;
    const currentPage = Number(page) || 1;
    const { data, count } = await adminQueryArticles({
        page: currentPage,
        size,
        search,
    });

    return (
        <>
            <div className="mb-4 flex justify-between">
                <div className="relative">
                    <ProgressBarProvider>
                        <ProgressBar className="absolute h-1 shadow-lg shadow-blue-600/20 bg-blue-600 top-0 " />
                        <SearchComponent query={search || ""} homepage="admin/blog" placeholder="搜索标题/内容，按回车搜索" />
                    </ProgressBarProvider>
                </div>
                <Link href="/admin/blog/create">
                    <Button>创建博客</Button>
                </Link>
            </div>
            {/* @ts-expect-error columns */}
            <DataTable columns={columns} data={data as NonNullable<typeof data>} fixed colgroup={(
                <colgroup>
                    <col className="w-12" />
                    <col className="w-auto" />
                    <col className="w-12" />
                    <col className="w-12" />
                    <col className="w-12" />
                    <col className="w-40" />
                    <col className="w-40" />
                    <col className="w-12" />
                </colgroup>
            )} />
            {
                count > size ? (
                    <Suspense fallback={<></>}>
                        <Pagination page={currentPage} size={size} count={count}></Pagination>
                    </Suspense>
                ) : null
            }
        </>
    );
};

export default AdminBlogPage;