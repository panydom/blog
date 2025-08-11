import { Loader2 } from "lucide-react";
import cls from "classnames";

const Loading = ({ label, children, className }: { label?: string, children?: React.ReactNode, className?: string }) => {
    return (
        <div className={cls("text-center flex items-center justify-center", className)}>
            <Loader2 className="animate-spin mr-4"></Loader2>{children || label}
        </div>
    );
};

export default Loading;