'use client';
import { useContext } from 'react';
import { Button } from "@/components/ui/button";
import Link from 'next/link';

import { AuthContext } from '@/context/AuthContext';

const LoginButton = () => {
    const data = useContext(AuthContext);
    console.log(data);

    return (
        <Link href="/login"><Button>登录</Button></Link>
    );
};

export default LoginButton;