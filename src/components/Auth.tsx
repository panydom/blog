'use client';
import { useEffect, type ReactNode } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Loader2, Ban } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface AuthProps {
    requireLogin?: boolean;
    requireAdmin?: boolean;
    children: ReactNode;
}

const AuthComponent = ({ requireAdmin = false, requireLogin = false, children }: AuthProps) => {
    const { user, isAdmin, loading } = useAuth();
    const router = useRouter();
    console.log(user, isAdmin, loading);

    useEffect(() => {
        if (loading) {
            return;
        }
        if (requireLogin && !user) {
            router.push('/login?redirect=' + encodeURIComponent(window.location.href));
            return;
        }
        if (requireAdmin && (!user || !isAdmin)) {
            if (!user) {
                router.push('/login?redirect=' + encodeURIComponent(window.location.href));
            }
            else {
                // 已登录，但是权限不够
                router.push('/');
            }
            return;
        }
    }, [loading, requireLogin, requireAdmin, user, isAdmin, router]);

    if (loading) {
        return (
            <div className='mt-[200px] text-center flex items-center justify-center'>
                <Loader2 className="animate-spin mr-4"></Loader2>验证登录状态...
            </div>
        );
    }

    if (requireLogin && !user) {
        return (
            <div className='mt-[200px] text-center flex items-center justify-center'>
                <Ban className="mr-4"></Ban>登录之后才能访问，正在重定向到登录页面...
            </div>
        );
    }

    if (requireAdmin && (!user || !isAdmin)) {
        return (
            <div className='mt-[200px] text-center flex items-center justify-center'>
                <Ban className="mr-4"></Ban>管理员才能访问，正在重定向到登录页面...
            </div>
        );
    }

    return (
        <>
            {children}
        </>
    );
};


export default AuthComponent;