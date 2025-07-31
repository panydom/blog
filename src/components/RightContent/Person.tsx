import { Card, CardHeader, CardDescription, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

const Person = ({ count }: { count: number }) => {
    return (
        <Card>
            <CardHeader className={`flex flex-col items-center justify-center`}>
                <Avatar className={`w-16 h-16`}>
                    <AvatarImage src="/head.jfif" alt='头像' />
                </Avatar>
                <CardDescription className={`mt-4`}>竹与墨，琴与孜然烤肉</CardDescription>
            </CardHeader>
            <div className={`px-10`}>
                <Separator></Separator>
            </div>
            <CardContent>
                <div className={`flex px-4 h-12 items-center justify-around space-x-4 text-sm`}>
                    <div className={`flex flex-col justify-center items-center cursor-pointer`}>
                        <span className={`text-base font-semibold`}>博客</span>
                        <CardDescription className={`mt-2`}>{count}</CardDescription>
                    </div>
                    <Separator orientation="vertical" />
                    <div className={`flex flex-col justify-center items-center cursor-pointer`}>
                        <span className={`text-base font-semibold`}>浏览</span>
                        <CardDescription className={`mt-2`}>5</CardDescription>
                    </div>
                    <Separator orientation="vertical" />
                    <div className={`flex flex-col justify-center items-center cursor-pointer`}>
                        <span className={`text-base font-semibold`}>评价</span>
                        <CardDescription className={`mt-2`}>5</CardDescription>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default Person;