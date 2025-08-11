"use client";

import { useState, useEffect } from "react";
import { Link } from "react-transition-progress/next";
import { redirect } from "next/navigation";
import Form from "../_components/Form";
import { useLogined } from "@/context/AuthContext";

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
                title="注册账号"
                submitLabel='注册'
                description={(
                    <>
                        已有账号？ 前往<Link href="/login" className='text-blue-500 hover:underline'>登录</Link>
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