import DataTable from "@/components/data-table";
import { columns } from './columns';
import { getAllArticles } from '@/lib/articles';
import { Button } from "@/components/ui/button";
import Link from 'next/link';

import { type Metadata } from 'next';
export const metadata: Metadata = {
    title: "博客管理",
    description: "博客管理",
};


const AdminBlogPage = async ({ searchParams }: { searchParams: Promise<{ page: string }> }) => {
    const page = (await searchParams)?.page || 1;
    const { data } = await getAllArticles(Number(page), 10);

    return (
        <>
            <div className="mb-4 flex justify-end">
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
        </>
    );
};

export default AdminBlogPage;