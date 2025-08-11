"use client";

import { Link } from "react-transition-progress/next";
import { Separator } from "@/components/ui/separator";
import LoginGithub from "./login-github";
import Form from "../_components/Form";
import { useLogined } from "@/context/AuthContext";

const Login = () => {
    useLogined();

    return (
        <div className='w-[400px] mx-auto mt-[200px]'>
            <Form isLogin title='登录' submitLabel='登录' description={(
                <>
                    没有账号？前往 <Link href="/register" className='text-blue-500 hover:underline'>注册</Link>
                </>
            )}>
            </Form>
            <Separator className='mt-6' />
            <LoginGithub></LoginGithub>
        </div>
    );
};

export default Login;