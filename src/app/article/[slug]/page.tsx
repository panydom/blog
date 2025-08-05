import { Suspense } from "react";
import { getPostDetail, getRecentArticles } from "@/lib/articles";
import { notFound } from "next/navigation";
import { Link } from "react-transition-progress/next";
import { formatTime } from "@/lib/utils";
import { CalendarDays, CalendarRange, Eye, Clock3 } from "lucide-react";
import { cookies } from "next/headers";

import ArticleView from "./ArticleView";
import ArticleContent from "./ArticleContent";

interface PostProps {
    params: Promise<{ id: number | string; slug: string; }>
}

// ISR: https://nextjs.org/docs/app/guides/incremental-static-regeneration
export const revalidate = 60;
export const dynamicParams = true;

export async function generateStaticParams() {
    const { data } = await getRecentArticles();
    if (!data) {
        return [];
    }
    return data.map(item => ({ id: String(item.id), slug: item.slug }));
}

const Post = async ({ params }: PostProps) => {
    const { slug } = await params;
    const { data: article } = await getPostDetail(slug);
    const cookieStore = await cookies();
    const timezone = cookieStore.get("user-timezone")?.value;

    if (!article) {
        notFound();
    }

    return (
        <ArticleView id={article.id}>
            <div className='shadow-sm border py-12 px-16 rounded-2xl'>
                <div className='text-neutral-500 dark:text-neutral-100 text-sm'>
                    <Link href="/">首页</Link><span className='mx-2'>/</span>{article.title}
                </div>
                <div className='mt-12 text-3xl font-bold'>{article.title}</div>
                <div className='text-neutral-500 dark:text-neutral-100 mt-10 text-xs flex'>
                    <div className='flex items-center'>
                        <CalendarDays className='mr-2' size={14}></CalendarDays>
                        最后更新时间：{formatTime(article.updated_at, timezone)}
                    </div>
                    <div className='ml-4 flex items-center'>
                        <Eye size={14} className="mr-2"></Eye>
                        浏览量：{article.view_count ? article.view_count + 1 : 1}
                    </div>
                    <div className='ml-4 flex items-center'>
                        <Clock3 className='mr-2' size={14}></Clock3>
                        预计阅读时长：{Math.max(1, Math.round((article.content?.length || 0) / 400))}分钟
                    </div>
                </div>
                <article className='text-neutral-800 dark:text-neutral-100 mt-6'>
                    <Suspense fallback={<div>加载中...</div>}>
                        <ArticleContent content={article.content || ""}></ArticleContent>
                    </Suspense>
                </article>
                <div className='mt-10 flex justify-between text-neutral-500 dark:text-neutral-100 text-xs'>
                    <div className='flex items-center'>
                        <CalendarRange className='mr-2' size={14}></CalendarRange>
                        创建于：{formatTime(article.created_at, timezone)}
                    </div>
                </div>
            </div>
        </ArticleView>
    );
};

export default Post;