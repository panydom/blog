
import { useState } from "react";
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { X } from "lucide-react";
import ButtonWithLoading from "@/components/common/ButtonWithLoading";

const DeleteDialog = ({
    children,
    title,
    description,
    onConfirm,
}: {
    children: React.ReactNode;
    title: string;
    description: string;
    onConfirm: () => Promise<void>;
}) => {
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    async function handleConfirm() {
        try {
            setLoading(true);
            await onConfirm();
            setOpen(false);
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            {children}
            <AlertDialogContent>
                <X className="absolute cursor-pointer right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 disabled:pointer-events-none" onClick={() => setOpen(false)} />
                <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    <AlertDialogDescription>{description}</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>取消</AlertDialogCancel>
                    <ButtonWithLoading onClick={handleConfirm} loading={loading}>确认</ButtonWithLoading>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default DeleteDialog; 