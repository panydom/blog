"use client";
import { useState, FormEvent } from "react";
import { useAuth } from "@/context/AuthContext";
import { Link } from "react-transition-progress/next";
import Loading from "@/components/common/Loading";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import ButtonWithLoading from "@/components/common/ButtonWithLoading";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface CommentFormProps {
    articleId: number;
}

const CommentForm = ({ articleId }: CommentFormProps) => {
    const { user, loading } = useAuth();
    const [nickname, setNickname] = useState("");
    const [content, setContent] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const router = useRouter();

    async function handleConfirm(e: FormEvent) {
        e.stopPropagation();
        e.preventDefault();
        try {
            if (!content) {
                toast.error("请输入评论内容");
                return;
            }
            setSubmitting(true);
            const res = await fetch("/api/comment/create", {
                method: "POST",
                body: JSON.stringify({
                    nickname,
                    content,
                    article_id: articleId,
                }),
            });
            const resJson = await res.json();
            if (!resJson.success) {
                toast.error(resJson.message);
                return;
            }
            toast.success("评论成功");
            setContent("");
            setNickname("");
            router.refresh();
        }
        catch (e) {
            // @ts-expect-error empty error
            toast.error(e?.message);
        }
        finally {
            setSubmitting(false);
        }
    }

    if (loading) {
        return (
            <Loading className="mt-16">正在获取用户信息...</Loading>
        );
    }

    return (
        <div className="mt-16">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50 mb-4">发表评论</h3>
            {!user && (
                <p>请在<Link
                    className="font-medium text-blue-600 hover:text-blue-500 underline"
                    href={`/login?redirect=${encodeURIComponent(window.location.href)}`}
                >登录</Link>
                    后，再发表评论</p>
            )}
            <div >
                <div className='flex gap-2 mb-4'>
                    <Label htmlFor="nickname" className='min-w-20 w-20 h-9 leading-9'>昵称</Label>
                    <Input
                        type="text"
                        id="nickname"
                        name="nickname"
                        placeholder='昵称（选填）'
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)}
                    />
                </div>
                <div className='flex gap-2 mb-4'>
                    <Label htmlFor="content" className='min-w-20 w-20 h-9 leading-9'>内容</Label>
                    <Textarea
                        placeholder="请输入评论内容"
                        className="min-h-[120px]"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                </div>
            </div>
            <div className='flex gap-5 justify-end'>
                <ButtonWithLoading onClick={handleConfirm} loading={submitting}>发布</ButtonWithLoading>
            </div>
        </div>
    );
};

export default CommentForm;