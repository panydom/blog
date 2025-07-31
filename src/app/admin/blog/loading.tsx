import { Skeleton } from "@/components/ui/skeleton";

const BlogLoading = () => {
    return (
        <>
            <div className="mb-4 flex justify-end">
                <Skeleton className="w-[88px] h-8"></Skeleton>
            </div>
            <Skeleton className="w-full h-8 mb-2"></Skeleton>
            <Skeleton className="w-full h-8 mb-2"></Skeleton>
            <Skeleton className="w-full h-8 mb-2"></Skeleton>
            <Skeleton className="w-full h-8 mb-2"></Skeleton>
            <Skeleton className="w-full h-8 mb-2"></Skeleton>
            <Skeleton className="w-full h-8 mb-2"></Skeleton>
            <Skeleton className="w-full h-8 mb-2"></Skeleton>
            <Skeleton className="w-full h-8 mb-2"></Skeleton>
            <div className="flex justify-center">
                <Skeleton className="w-40 h-8"></Skeleton>
            </div>
        </>
    );
};

export default BlogLoading;