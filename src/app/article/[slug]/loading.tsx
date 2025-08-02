import { Skeleton } from "@/components/ui/skeleton";

const ArticleLoading = () => {
    return (
        <div className='shadow-sm border py-12 px-16 rounded-2xl'>
            <Skeleton className="w-1/2 h-5"></Skeleton>
            <Skeleton className="w-full h-10 mt-12"></Skeleton>
            <Skeleton className="w-20 h-8 mt-6"></Skeleton>
            <Skeleton className="w-1/2 h-4 mt-4"></Skeleton>
            <Skeleton className="w-full h-8 mt-2"></Skeleton>
            <Skeleton className="w-full h-8 mt-3"></Skeleton>
            <Skeleton className="w-full h-20 mt-4"></Skeleton>
            <Skeleton className="w-full h-10 mt-6"></Skeleton>
            <Skeleton className="w-20 h-8 mt-10"></Skeleton>
            <Skeleton className="w-full h-32 mt-6"></Skeleton>
            <Skeleton className="w-full h-8 mt-2"></Skeleton>
            <Skeleton className="w-full h-8 mt-2"></Skeleton>
            <Skeleton className="w-full h-8 mt-2"></Skeleton>
            <Skeleton className="w-full h-8 mt-2"></Skeleton>
            <Skeleton className="w-1/3 h-4 mt-2"></Skeleton>
        </div>
    );
};

export default ArticleLoading;