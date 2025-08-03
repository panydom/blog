import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";

const OverflowEllipsis = ({ content }: { content: string }) => {
    return (
        <Tooltip>
            <TooltipTrigger className='overflow-hidden text-ellipsis max-w-full'>
                {content}
            </TooltipTrigger>
            <TooltipContent>
                {content}
            </TooltipContent>
        </Tooltip>
    );
};

export default OverflowEllipsis;