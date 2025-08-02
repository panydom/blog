import PostForm from "../_post-form";

const CreateBlog = () => {
    return (
        <div className='w-full mx-auto'>
            <div className='text-2xl font-bold'>创建博客</div>
            <div className='mt-10'>
                <PostForm />
            </div>
        </div>
    );
};

export default CreateBlog;