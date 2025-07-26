'use client';

import { createContext, ReactNode, useEffect, useState } from 'react';
import { getCurrentUser } from '@/lib/auth';


export const AuthContext = createContext({});

export function AuthProvider({ children }: { children: ReactNode }) {

    const [user, setUser] = useState(null as unknown as object);

    useEffect(() => {
        async function getUserInfo() {
            const res = await getCurrentUser();
            if (res.error || !res.data.user) return;
            setUser(res.data.user);
        }

        getUserInfo();
    }, []);

    return (
        <AuthContext.Provider value={{ user }}>
            {children}
        </AuthContext.Provider>

    );
}