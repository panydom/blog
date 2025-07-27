'use client';

import { type ReactNode } from 'react';
import Auth from '@/components/Auth';

const AdminLayout = ({ children }: { children: ReactNode }) => {

    return (
        <Auth requireAdmin requireLogin>{children}</Auth>
    );
};

export default AdminLayout;