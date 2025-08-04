"use client";

import { useState, FormEvent, startTransition, useEffect, useRef } from "react";
import { useSetState, useMount } from "react-use";
import { toast } from "sonner";
import { PartyPopper } from "lucide-react";
import { useProgress } from "react-transition-progress";
// import { Link } from "react-transition-progress/next";
import NextLink from "next/link";
import { useRouter } from "next/navigation";

// https://imzbf.github.io/md-editor-rt/en-US/demo/
import { MdEditor, type Themes } from "md-editor-rt";
import { useTheme } from "next-themes";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ButtonWithLoading from "@/components/common/ButtonWithLoading";
import MultipleSelector, { Option } from "@/components/ui/multiple-selector";
import { TagType } from "@/lib/tags";

interface CreateResponse {
    id: number;
    slug: string;
    isEdit?: boolean;
}

function useBack() {
    const router = useRouter();
    const startProgress = useProgress();;
    function handleBack() {
        startProgress();
        router.push("/admin/blog");
    }
    return handleBack;
}

function CreateSuccess({ id, slug, isEdit }: CreateResponse) {
    const back = useBack();
    const [out, setOut] = useState(3);
    const currentTime = useRef(performance.now());

    useEffect(() => {
        const timer = setTimeout(() => {
            startTransition(() => {
                back();
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
            {isEdit ? "编辑" : "创建"}成功！{out}秒后自动跳转到博客列表...
            <NextLink
                className='ml-4 text-blue-600 hover:text-blue-700'
                href={`/article/${slug || id}`}
                target='_blank'
            >点此查看</NextLink>
        </div>
    );
}

interface PostFormProps {
    title?: string;
    content?: string;
    isEdit?: boolean;
    id?: number;
    tags?: Array<Option>;
}

const CreateForm = (props: PostFormProps) => {
    const { theme } = useTheme();
    const editorTheme: Themes = theme === "dark" ? "dark" : "light";
    const [title, setTitle] = useState(props.title || "");
    const [content, setContent] = useState(props.content || "");
    const [tags, setTags] = useState<Array<Option>>(props.tags || []);
    const [loading, setLoading] = useState(false);
    const [tagOptions, setTagOptions] = useState<Array<Option>>([]);
    const [response, setResponse] = useSetState({
        success: false,
        data: { id: 0, slug: "" },
    });

    const back = useBack();

    async function handleConfirm(e: FormEvent) {
        e.stopPropagation();
        e.preventDefault();
        try {
            setLoading(true);
            const url = props.isEdit ? "/api/article/update/" + props.id : "/api/article/create";
            const data: { title: string; content: string; tags: number[]; prevTags?: number[] } = {
                title,
                content,
                tags: tags.map(tag => Number(tag.value)),
            };
            if (props.isEdit) {
                data.prevTags = props.tags?.map(tag => Number(tag.value));
            }
            const response = await fetch(url, {
                method: props.isEdit ? "PUT" : "POST",
                body: JSON.stringify(data),
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

    useMount(async () => {
        const res = await fetch("/api/tags/list");
        const resJson: ResponseData<TagType[]> = await res.json();
        if (!resJson.success) {
            toast.error(resJson.message);
            return;
        }
        setTagOptions(resJson.data?.map(tag => ({
            value: tag.id.toString(),
            label: tag.name,
        })));
    });

    if (response.success) {
        return <CreateSuccess id={response.data.id} slug={response.data.slug} isEdit={props.isEdit} />;
    }
    return (
        <>
            <form >
                <div className='flex gap-2 mb-4'>
                    <Label htmlFor="title" className='min-w-20 w-20 h-9 leading-9'>标题</Label>
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
                    <Label htmlFor="tags" className='min-w-20 w-20 h-9 leading-9'>标签</Label>
                    <MultipleSelector
                        value={tags}
                        onChange={setTags}
                        options={tagOptions}
                        hidePlaceholderWhenSelected
                        placeholder="选择标签"
                        creatable={false}
                        loadingIndicator={
                            <p className="py-2 text-center text-lg leading-10 text-muted-foreground">加载中...</p>
                        }
                        emptyIndicator={
                            <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                                没有找到结果。
                            </p>
                        }
                    />
                </div>
                <div className='flex gap-2 mb-4'>
                    <Label htmlFor="content" className='min-w-20 w-20 h-9 leading-9'>内容</Label>
                    <MdEditor theme={editorTheme} noMermaid value={content} onChange={(value: string) => setContent(value)} ></MdEditor>
                </div>
            </form>
            <div className='flex gap-5 justify-end'>
                <Button variant='outline' onClick={back}>返回</Button>
                <ButtonWithLoading onClick={handleConfirm} loading={loading}>发布</ButtonWithLoading>
            </div>
        </>
    );
};

export default CreateForm;