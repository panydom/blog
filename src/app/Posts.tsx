
import { Suspense } from "react";
import { Eye, CalendarDays } from "lucide-react";
import Image from "next/image";
import { Link } from "react-transition-progress/next";
import { Pagination, type PaginationProps } from "@/components/common/Pagination";
import type { PostData } from "@/lib/articles";
import { formatTime } from "@/lib/utils";
import { cookies } from "next/headers";

interface PostsProps extends PaginationProps {
    data: PostData;
}

export const experimental_ppr = true;

const Posts = async ({ data, count, page, size }: PostsProps) => {
    const cookieStore = await cookies();
    const timezone = cookieStore.get("user-timezone")?.value;
    return (
        <>
            {
                data?.length ? data.map((article) => {
                    return (
                        <div key={article.id} className="flex shadow-sm border p-4 rounded-2xl transform hover:-translate-y-1 transition-all duration-200 not-first:mt-6">
                            <div className="w-36 h-36 min-w-36 relative rounded-2xl overflow-hidden" >
                                <Image src="/blog.png" alt={article.title + "的图片"} style={{ objectFit: "cover" }} fill></Image>
                            </div>
                            <div className="ml-4 w-full flex flex-col justify-between">
                                <div>
                                    <div className="line-clamp-2 overflow-hidden font-bold text-lg cursor-pointer">
                                        <Link href={`/article/${article.slug || article.id}`}>{article.title}</Link>
                                    </div>
                                    <div className="line-clamp-2 overflow-hidden mt-2 text-neutral-500 dark:text-neutral-100 break-all">{article.content}</div>
                                </div>
                                <div className="text-neutral-500 dark:text-neutral-100 flex items-center justify-between mt-2 w-full">
                                    <div>
                                        <div className="flex items-center">
                                            <Eye size={14} className="mr-2"></Eye>{article.view_count}
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex items-center">
                                            <CalendarDays size={14} className="mr-2"></CalendarDays>最近更新：{formatTime(article.updated_at, timezone)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                }) : null
            }
            <Suspense fallback={<></>}>
                <Pagination page={page} size={size} count={count}></Pagination>
            </Suspense>
        </>
    );
};

export default Posts;
