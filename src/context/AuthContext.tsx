'use client';

import { createContext, ReactNode, useEffect, useState, useContext } from 'react';
import { getCurrentUser, SignOut, SignIn } from '@/lib/auth';
import { type User } from '@/lib/auth';
import { toast } from 'sonner';
import { redirect } from 'next/navigation';
import { useRouter } from 'next/navigation';

type Auth = {
    user: User;
    logout: () => void,
    login: (prevState: object, formData: FormData) => ReturnType<typeof SignIn>,
    updateUserInfo: () => void;
};

export const AuthContext = createContext({} as Auth);

export function AuthProvider({ children }: { children: ReactNode }) {

    const [user, setUser] = useState<User>(null);
    const router = useRouter();

    async function updateUserInfo() {
        const res = await getCurrentUser();
        if (res.error || !res.data.user) return;
        setUser(res.data.user);
    }

    useEffect(() => {
        // let watch: ResolvedReturnType<typeof watchAuthChange>['data'];
        // async function startWatch() {
        //     const { data } = await watchAuthChange(user => {
        //         console.log(user);

        //     });
        //     watch = data;
        // }

        updateUserInfo();
        // startWatch();
        return () => {
            // watch?.subscription.unsubscribe();
        };
    }, []);

    async function logout() {
        try {
            await SignOut();
            updateUserInfo();
            router.push('/');
        }
        catch (e) {
            console.log(e);
            toast.error("退出失败，请重试");
        }
    }

    async function login(prevState: object, formData: FormData) {
        try {
            const res = await SignIn(formData);
            updateUserInfo();
            router.push('/');
            return res;
        }
        catch (e) {
            console.log(e);
            toast.error("登录失败，请重试");
            return {
                // @ts-expect-error message is null
                message: e?.message
            };
        }
    }

    return (
        <AuthContext.Provider value={{ user, logout, login, updateUserInfo }}>
            {children}
        </AuthContext.Provider>

    );
}

export const useAuth = () => {
    return useContext(AuthContext);
};

export const useLogined = () => {
    const { user } = useContext(AuthContext);
    useEffect(() => {
        if (user) {
            redirect('/');
        }
    }, [user]);
};