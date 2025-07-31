import { getPostDetail, getRecentArticles } from "@/lib/articles";
import { notFound } from "next/navigation";
import { Link } from "react-transition-progress/next";
import dayjs from "dayjs";
import { CalendarDays, CalendarRange, Eye, Clock3 } from "lucide-react";

import ArticleView from "./ArticleView";

interface PostProps {
    params: Promise<{ id: number }>
}

export async function generateStaticParams() {
    const { data } = await getRecentArticles();
    if (!data) {
        return [];
    }
    return data.map(item => ({ id: String(item.id) }));
}

const Post = async ({ params }: PostProps) => {
    const { id } = await params;
    const { data: article } = await getPostDetail(id);

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
                        最后更新时间：{dayjs(article.updated_at).format("YYYY-MM-DD HH:mm:ss")}
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
                <div className='text-neutral-800 dark:text-neutral-100 mt-6'>{article.content}</div>
                <div className='mt-10 flex justify-between text-neutral-500 dark:text-neutral-100 text-xs'>
                    <div className='flex items-center'>
                        <CalendarRange className='mr-2' size={14}></CalendarRange>
                        创建于：{dayjs(article.created_at).format("YYYY-MM-DD HH:mm:ss")}
                    </div>
                </div>
            </div>
        </ArticleView>
    );
};

export default Post;