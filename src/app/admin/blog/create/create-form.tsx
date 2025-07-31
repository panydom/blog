"use client";

import { useState, FormEvent, startTransition, useEffect, useRef } from "react";
import { useSetState } from "react-use";
import { toast } from "sonner";
import { PartyPopper } from "lucide-react";
import { useProgress } from "react-transition-progress";
// import { Link } from "react-transition-progress/next";
import NextLink from "next/link";
import { useRouter } from "next/navigation";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import ButtonWithLoading from "@/components/common/ButtonWithLoading";

interface CreateResponse {
    id: number;
    slug: string;
}

function CreateSuccess({ id, slug }: CreateResponse) {
    const router = useRouter();
    const startProgress = useProgress();
    const [out, setOut] = useState(3);
    const currentTime = useRef(performance.now());

    useEffect(() => {
        const timer = setTimeout(() => {
            startTransition(() => {
                startProgress();
                router.push(`/admin/blog`);
            });
        }, 3000);
        return () => {
            clearTimeout(timer);
        };
    }, []);

    useEffect(() => {
        const nextTick = currentTime.current + (4 - out) * 1000;
        const timer = setTimeout(() => {
            setOut(out - 1);
        }, Math.max(nextTick - performance.now(), 0));
        return () => {
            clearTimeout(timer);
        };
    }, [out]);

    return (
        <div className='flex w-fit mx-auto mt-32'>
            <PartyPopper className='mr-4'></PartyPopper>
            创建成功！{out}秒后自动跳转到博客列表...
            <NextLink
                className='ml-4 text-blue-600 hover:text-blue-700'
                href={`/article/${slug || id}`}
                target='_blank'
            >点此查看</NextLink>
        </div>
    );
}


const CreateForm = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useSetState({
        success: false,
        data: { id: 0, slug: "" },
    });

    const router = useRouter();

    async function handleConfirm(e: FormEvent) {
        e.stopPropagation();
        e.preventDefault();
        try {
            setLoading(true);
            const response = await fetch("/api/article/create", {
                method: "POST",
                body: JSON.stringify({
                    title,
                    content,
                }),
            });
            const res: ResponseData<CreateResponse> = await response.json();

            if (res.success) {
                toast.success(res.message);
                setResponse({
                    success: true,
                    data: res.data,
                });
            } else {
                toast.error(res.message);
            }
        }
        finally {
            setLoading(false);
        }
    }

    if (response.success) {
        return <CreateSuccess id={response.data.id} slug={response.data.slug} />;
    }
    return (
        <form onSubmit={handleConfirm}>
            <div className='flex gap-2 mb-4'>
                <Label htmlFor="title" className='w-20 h-9 leading-9'>标题</Label>
                <Input
                    type="text"
                    id="title"
                    name="title"
                    placeholder='请输入标题'
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>
            <div className='flex gap-2 mb-4'>
                <Label htmlFor="content" className='w-20 h-9 leading-9'>内容</Label>
                <Textarea
                    id="content"
                    name="content"
                    className='h-64'
                    placeholder='请输入内容'
                    required
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
            </div>
            <div className='flex gap-5 justify-end'>
                <Button variant='outline' onClick={() => router.back()}>返回</Button>
                <ButtonWithLoading onClick={handleConfirm} loading={loading}>发布</ButtonWithLoading>
            </div>
        </form>
    );
};

export default CreateForm;