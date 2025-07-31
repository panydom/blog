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
            <Form isLogin title='Login' submitLabel='Login' description={(
                <>
                    do not have an account? <Link href="/register" className='text-blue-500 hover:underline'>Sign Up</Link>
                </>
            )}>
            </Form>
            <Separator className='mt-6' />
            <LoginGithub></LoginGithub>
        </div>
    );
};

export default Login;