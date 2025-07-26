import { Button } from "@/components/ui/button";
import Link from 'next/link';
import { Bird } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import LoginButton from "./LoginButton";

const PageHeader = () => {
    return (
        <div className={`h-16 px-3 bg-background sticky top-0 border-b border-b-gray-50`}>
            <div className={`w-[980px] mx-auto flex`}>
                <div className="leading-16 text-2xl flex-1">
                    <Bird className='inline-block -mt-[10px]' size={36}></Bird>
                    <Link href="/" className='ml-4'>竹与墨</Link>
                    <span className="ml-2 text-sm self-end text-neutral-700">琴与孜然烤肉</span>
                </div>
                <div className={`leading-16 flex items-center gap-6`}>
                    <Link href="/" target='__blank'>首页</Link>
                    <Link href="https://github.com/panydom/blog" target='__blank'>Github</Link>
                    <LoginButton></LoginButton>
                    <ThemeToggle></ThemeToggle>
                </div>
            </div>
        </div>
    );
};

export default PageHeader;