'use client';
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    DropdownMenuShortcut,
} from "@/components/ui/dropdown-menu";
import { LogOut, SquareChevronRight } from "lucide-react";


import { useAuth } from '@/context/AuthContext';

const LoginButton = () => {
    const { user, isAdmin, logout } = useAuth();

    if (!user) {
        return (
            <Link href="/login"><Button>登录</Button></Link>
        );
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="outline-0">{user.email}</DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuLabel className="px-2 py-1.5 text-sm font-semibold">账号设置</DropdownMenuLabel>
                <DropdownMenuSeparator></DropdownMenuSeparator>
                {
                    isAdmin && (
                        <Link href='/admin'>
                            <DropdownMenuItem>
                                <SquareChevronRight />
                                <span>控制台</span>
                            </DropdownMenuItem>
                        </Link>
                    )
                }
                <DropdownMenuItem onClick={logout}>
                    <LogOut />
                    <span>退出登录</span>
                    <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default LoginButton;