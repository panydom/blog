'use client';
import { useActionState, useEffect, ReactNode } from 'react';
import { useFormStatus, } from 'react-dom';
import { Loader2 } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { createAccount, SignIn } from '@/lib/auth';
import { toast } from 'sonner';

const initialState = {
    message: null
};

function SubmitButton({ label }: { label: string }) {
    const { pending } = useFormStatus();

    return (
        <Button type="submit" className='w-full mt-6' disabled={pending}>
            {pending ? <Loader2 className="animate-spin" /> : null}
            {label}
        </Button>
    );
}

const Form = ({
    title,
    description,
    submitLabel,
    onSuccess,
    isLogin = false
}: {
    title: string,
    description: ReactNode,
    submitLabel: string,
    onSuccess?: () => void,
    isLogin?: boolean
}) => {

    const [state, formAction] = useActionState(isLogin ? SignIn : createAccount, initialState);

    useEffect(() => {
        if (state?.message) {
            toast.message(state.message);
        }
        if (state?.success) {
            if (onSuccess) onSuccess();
        }
    }, [onSuccess, state]);

    return (<form action={formAction}>
        <Card>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
                <div className='space-y-1'>
                    <Label htmlFor='email'>Email</Label>
                    <Input id="email" name="email" placeholder='Your email, e.g you@google.com'></Input>
                </div>
                <div className="space-y-1 mt-4">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" name="password" placeholder="*****" />
                </div>
            </CardContent>
        </Card>
        <SubmitButton label={submitLabel}></SubmitButton>
    </form>);
};

export default Form;