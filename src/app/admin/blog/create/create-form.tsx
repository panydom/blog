'use client';

import { useState, FormEvent } from 'react';
import { useSetState } from 'react-use';
import { toast } from 'sonner';
import { PartyPopper } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import ButtonWithLoading from '@/components/common/ButtonWithLoading';

const CreateForm = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useSetState({
        success: false,
        data: { id: 0 },
    });

    const router = useRouter();


    async function handleConfirm(e: FormEvent) {
        e.stopPropagation();
        e.preventDefault();
        try {
            setLoading(true);
            const response = await fetch('/api/article/create', {
                method: "POST",
                body: JSON.stringify({
                    title,
                    content,
                }),
            });
            const res: ResponseData<{ id: number }> = await response.json();

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
        setTimeout(() => {
            router.push(`/admin/blog`);
        }, 5000);
        return (
            <div className='flex w-fit mx-auto mt-32'>
                <PartyPopper className='mr-4'></PartyPopper>
                创建成功！正在跳转到博客列表...
                <Link
                    className='ml-4 text-blue-600 hover:text-blue-700'
                    href={`/article/${response.data.id}`}
                    target='_blank'
                >点此查看</Link>
            </div>
        );
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