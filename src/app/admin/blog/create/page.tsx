import CreateForm from "./create-form";

const CreateBlog = () => {

    return (
        <div className='w-[620px] mx-auto'>
            <div className='text-2xl font-bold'>创建博客</div>
            <div className='mt-10'>
                <CreateForm />
            </div>
        </div>
    );
};

export default CreateBlog;