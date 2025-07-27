'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import Form from '../_components/Form';
import { useLogined } from '@/context/AuthContext';

const RegisterPage = () => {
    useLogined();

    const [success, setSuccess] = useState(false);
    const onSuccess = () => {
        setSuccess(true);
    };

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (success) {
            timer = setTimeout(() => {
                redirect("/login");
            }, 3000);
        }
        return () => {
            if (timer) {
                clearTimeout(timer);
            }
        };
    }, [success]);

    const content = success ? (
        <div className='w-[720px] mx-auto text-center'>
            恭喜！注册成功，正在跳转到登录页面...
        </div>
    ) : (
        <div className='w-[400px] mx-auto '>
            <Form
                title="Register an Account "
                submitLabel='Register'
                description={(
                    <>
                        have an account? <Link href="/login" className='text-blue-500 hover:underline'>Login</Link>
                    </>
                )}
                onSuccess={onSuccess}
            ></Form>
        </div>
    );

    return (
        <div className='mt-[200px]'>
            {content}
        </div>
    );
};

export default RegisterPage;