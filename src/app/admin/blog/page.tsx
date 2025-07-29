import DataTable from "@/components/data-table";
import { columns } from './columns';
import { getAllArticles } from '@/lib/articles';

const AdminBlogPage = async ({ searchParams }: { searchParams: Promise<{ page: string }> }) => {
    const page = (await searchParams)?.page || 1;
    const { data } = await getAllArticles(Number(page), 10);

    return (
        <>
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