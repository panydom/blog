'use client';

import { createContext, ReactNode, useEffect, useState, useContext } from 'react';
import { getCurrentUser, SignOut, SignIn, checkSessionAndRefresh } from '@/lib/auth';
import { type User } from '@/lib/auth';
import { toast } from 'sonner';
import { redirect, useRouter, useSearchParams } from 'next/navigation';

type Auth = {
    user: User;
    isAdmin: boolean;
    loading: boolean;
    logout: () => void,
    login: (prevState: object, formData: FormData) => ReturnType<typeof SignIn>,
    updateUserInfo: () => void;
};

export const AuthContext = createContext({} as Auth);

export function AuthProvider({ children }: { children: ReactNode }) {

    const [user, setUser] = useState<User>(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const params = useSearchParams();

    async function updateUserInfo() {
        try {
            setLoading(true);
            const res = await getCurrentUser();
            if (res.error || !res.data.user) {
                setIsAdmin(false);
                setUser(null);
            }
            else {
                setIsAdmin(res.isAdmin);
                setUser(res.data.user);
            }
        }
        finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        // let watch: ResolvedReturnType<typeof watchAuthChange>['data'];
        // async function startWatch() {
        //     const { data } = await watchAuthChange(user => {
        //     });
        //     watch = data;
        // }

        updateUserInfo();
        // startWatch();
        return () => {
            // watch?.subscription.unsubscribe();
        };
    }, []);

    const checkSession = async () => {
        const session = await checkSessionAndRefresh();
        console.log(new Date(), session);

        if (!session) {
            setUser(null);
            setIsAdmin(false);
            router.push('/login');
        }
    };

    useEffect(() => {
        if (user) {
            checkSession();
            const timer = setInterval(() => {
                checkSession();
            }, 1000 * 60 * 5);
            return () => clearInterval(timer);
        }
    }, [user]);

    async function logout() {
        try {
            await SignOut();
            updateUserInfo();
            router.push('/');
        }
        catch (e) {
            toast.error("退出失败，请重试");
        }
    }

    async function login(prevState: object, formData: FormData) {
        try {
            const res = await SignIn(formData);
            if (res.success) {
                updateUserInfo();
                router.push(params.get('redirect') || '/');
            }
            return res;
        }
        catch (e) {
            toast.error("登录失败，请重试");
            return {
                // @ts-expect-error message is null
                message: e?.message
            };
        }
    }

    return (
        <AuthContext.Provider value={{ user, isAdmin, loading, logout, login, updateUserInfo }}>
            {children}
        </AuthContext.Provider>

    );
}

export const useAuth = () => {
    return useContext(AuthContext);
};

export const useLogined = () => {
    const { user } = useContext(AuthContext);
    const params = useSearchParams();
    useEffect(() => {
        if (user) {
            redirect(params.get('redirect') || '/');
        }
    }, [user]);
};