import type { Metadata } from "next";
import "./globals.css";
import MainLayout from '../components/MainLayout'
import { ThemeProvider } from '@/context/themeContext'

export const metadata: Metadata = {
    title: "竹与墨",
    description: "记录想法的点滴，汇聚成竹林",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`antialiased`}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <MainLayout>
                        {children}
                    </MainLayout>
                </ThemeProvider>
            </body>
        </html>
    );
}
