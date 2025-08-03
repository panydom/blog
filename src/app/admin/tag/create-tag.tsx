"use client";

import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ButtonWithLoading from "@/components/common/ButtonWithLoading";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { TagType } from "@/lib/tags";

const CreateTag = ({ isEdit, tag, children }: { isEdit?: boolean, tag?: TagType, children: React.ReactNode }) => {
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState(tag?.name || "");
    const [description, setDescription] = useState(tag?.description || "");
    const [open, setOpen] = useState(false);
    const router = useRouter();

    async function handleSave() {
        try {
            setLoading(true);
            if (!name) {
                toast.error("名称不能为空");
                return;
            }
            const url = isEdit ? `/api/tags/update/${tag?.id}` : "/api/tags/create";
            const res = await fetch(url, {
                method: isEdit ? "PUT" : "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, description }),
            });
            const resJson: ResponseData<null> = await res.json();
            if (!resJson.success) {
                toast.error(resJson.message);
                return;
            }
            setOpen(false);
            toast.success(isEdit ? "更新成功" : "创建成功");
            router.refresh();
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            {children}
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{isEdit ? "编辑" : "创建"}标签</DialogTitle>
                    <DialogDescription>
                        标签可以用来对文章进行标记，方便快速了解文章主题、内容等信息。
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            标签名称
                        </Label>
                        <Input id="name" value={name} onChange={(e) => setName(e.target.value)} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="description" className="text-right">
                            标签描述
                        </Label>
                        <Input id="description" value={description} onChange={(e) => setDescription(e.target.value)} className="col-span-3" />
                    </div>
                </div>
                <DialogFooter>
                    <ButtonWithLoading onClick={handleSave} loading={loading}>保存</ButtonWithLoading>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default CreateTag;