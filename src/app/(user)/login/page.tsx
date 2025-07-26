'use client';

import Link from 'next/link';
import { redirect } from 'next/navigation';
import { Separator } from '@/components/ui/separator';
import LoginGithub from './login-github';
import Form from '../_components/Form';

export const experimental_ppr = true;

const Login = () => {
    return (
        <div className='w-[400px] mx-auto mt-[200px]'>
            <Form isLogin title='Login' submitLabel='Login' description={(
                <>
                    do not have an account? <Link href="/register" className='text-blue-500 hover:underline'>Sign Up</Link>
                </>
            )} onSuccess={() => redirect('/')}>
            </Form>
            <Separator className='mt-6' />
            <LoginGithub></LoginGithub>
        </div>
    );
};

export default Login;