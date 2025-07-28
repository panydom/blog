'use client';

import { type ReactNode } from 'react';
import Auth from '@/components/Auth';
import { Separator } from '@/components/ui/separator';
import cls from 'classnames';
import { ArrowLeft, Cable, Users, Rss, MessageSquareText } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

const menuItemStyle = 'cursor-pointer hover:bg-gray-100 dark:hover:bg-stone-900 p-2 flex items-center';

const menuItems = [
    { href: '/admin', label: '总览', icon: Cable },
    { href: '/admin/blog', label: '博客管理', icon: Users },
    { href: '/admin/user', label: '用户管理', icon: Rss },
    { href: '/admin/comment', label: '评论管理', icon: MessageSquareText },
];

const AdminLayout = ({ children }: { children: ReactNode }) => {
    const pathname = usePathname();

    return (
        <Auth requireAdmin requireLogin>
            <div className='flex'>
                <div className="w-[200px] min-w-[200px] border rounded-lg py-1">
                    {
                        menuItems.map((item, index) => {
                            return (
                                <>
                                    {index !== 0 && <Separator />}
                                    <Link key={item.href} href={item.href}>
                                        <div className={cls(menuItemStyle)}>
                                            <item.icon className="mr-2" size={14} />{item.label}
                                            {pathname === item.href && <ArrowLeft className="ml-2" size={14} />}
                                        </div>
                                    </Link>
                                </>
                            );
                        })
                    }
                </div>
                <div className='flex-1 ml-4' style={{ width: 'calc(100% - 200px)' }}>
                    {children}
                </div>
            </div>
        </Auth>
    );
};

export default AdminLayout;