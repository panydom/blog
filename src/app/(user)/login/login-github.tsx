'use client';
import { Github } from 'lucide-react';
import { Button } from '@/components/ui/button';

const LoginGithub = () => {

    async function handleLogin() {
        try {
        }
        catch { }
    }
    return (
        <Button type="submit" className='w-full mt-6' onClick={handleLogin}><Github />Login with Github</Button>
    );
};

export default LoginGithub;