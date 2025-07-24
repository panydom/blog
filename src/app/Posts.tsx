
import { Suspense } from "react";
import { Eye } from 'lucide-react'
import Image from "next/image";
import Link from "next/link";
import { Pagination, type PaginationProps } from "@/components/common/Pagination";
import type { PostData } from '@/lib/articles'

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
                        <div key={article.id} className="flex shadow-sm border p-4 rounded-2xl transform hover:-translate-y-1 transition-all duration-200">
                            <div className="w-36 h-36 min-w-36 relative rounded-2xl overflow-hidden" >
                                <Image src="/blog.png" alt={article.title + "的图片"} style={{ objectFit: 'cover' }} fill></Image>
                            </div>
                            <div className="ml-4">
                                <div className="line-clamp-2 overflow-hidden font-bold text-lg cursor-pointer">
                                    <Link href={`/posts/${article.id}`}>{article.title}</Link>
                                </div>
                                <div className="line-clamp-2 overflow-hidden mt-4 text-neutral-500 dark:text-neutral-100">{article.content}</div>
                                <div className="text-neutral-500 dark:text-neutral-100 flex items-center mt-2">
                                    <Eye size={14} className="mr-2"></Eye>{article.view_count}
                                </div>
                            </div>
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
