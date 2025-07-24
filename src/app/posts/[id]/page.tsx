import { getPostDetail } from '@/lib/articles'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import dayjs from 'dayjs'

interface PostProps {
    params: { id: number }
}

const Post = async ({ params }: PostProps) => {
    const { id } = await params
    const { data: article } = await getPostDetail(id)
    // return JSON.stringify(data)

    if (!article) {
        notFound()
    }

    return (
        <div className='shadow-sm border py-12 px-16 rounded-2xl'>
            <div className='text-neutral-500 dark:text-neutral-100 text-sm'>
                <Link href="/">首页</Link><span className='mx-2'>/</span>{article.title}
            </div>
            <div className='mt-12 text-3xl font-bold'>{article.title}</div>
            <div className='text-neutral-500 dark:text-neutral-100 mt-10 text-xs'>
                最后更新时间：{dayjs(article.updated_at).format("YYYY-MM-DD HH:mm:ss")}
            </div>
            <div className='text-neutral-800 dark:text-neutral-100 mt-6'>{article.content}</div>
            <div className='mt-10 flex justify-between text-neutral-500 dark:text-neutral-100 text-xs'>
                <div>浏览量：{article.view_count}</div>
                <div >创建于：{dayjs(article.created_at).format("YYYY-MM-DD HH:mm:ss")}</div>
            </div>
        </div>
    )
}

export default Post