import { Loader2 } from "lucide-react";

const IndexLoading = () => {
    return (
        <div className="w-full mt-32 flex items-center justify-center">
            <Loader2 className="animate-spin mr-4"></Loader2>
            <p>正在加载博客列表...</p>
        </div>
    );
};

export default IndexLoading;