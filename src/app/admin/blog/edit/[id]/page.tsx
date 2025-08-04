import PostForm from "../../_post-form";
import { getPostDetail } from "@/lib/articles";
import { Ban } from "lucide-react";
import { Link } from "react-transition-progress/next";

const EditPost = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    const { data: article } = await getPostDetail(id);
    const tags = article?.tags?.map(tag => ({ value: tag.id.toString(), label: tag.name! })) || [];

    if (!article) {
        return <div className='w-[620px] mx-auto mt-40 flex items-center justify-center'>
            <Ban className='mr-2' size={14}></Ban>
            未找到文章、或该文章已被删除
            <Link href='/admin/blog' className="ml-2 text-blue-600 hover:text-blue-700">返回博客列表</Link>
        </div>;
    }
    return (
        <div className='w-full mx-auto'>
            <div className='text-2xl font-bold'>编辑博客</div>
            <div className='mt-10'>
                <PostForm title={article?.title || ""} content={article?.content || ""} isEdit id={article?.id} tags={tags} />
            </div>
        </div>
    );
};

export default EditPost;