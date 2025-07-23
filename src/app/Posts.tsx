
import { Pagination, type PaginationProps } from "@/components/common/Pagination";
import type { PostData } from '@/lib/articles'
import { Suspense } from "react";

interface PostsProps extends PaginationProps {
    data: PostData;
}

export const experimental_ppr = true;

const Posts = ({ data, count, page, size }: PostsProps) => {


    return (
        <>
            {
                data && data.map((article) => {
                    return (
                        <div key={article.id}>
                            {article.title}
                            {article.content}
                        </div>
                    )
                })
            }
            <Suspense fallback={<></>}>
                <Pagination page={page} size={size} count={count}></Pagination>
            </Suspense>
        </>
    )
}

export default Posts;