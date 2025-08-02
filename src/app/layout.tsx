import "md-editor-rt/lib/style.css";

import { Suspense } from "react";
import type { Metadata } from "next";
import "./globals.css";
import MainLayout from "../components/MainLayout";
import { ThemeProvider } from "@/context/themeContext";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/context/AuthContext";
import { ProgressBar, ProgressBarProvider } from "react-transition-progress";


export const metadata: Metadata = {
    title: "竹与墨",
    description: "记录想法的点滴，汇聚成竹林",
    icons: {
        icon: "/favicon.ico",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="zh-CN">
            <body className={`antialiased`}>
                <ProgressBarProvider>
                    <ProgressBar className="fixed h-1 shadow-lg shadow-blue-600/20 bg-blue-600 top-0 z-[11001]" />
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="system"
                        enableSystem
                        disableTransitionOnChange
                    >
                        <Suspense>
                            <AuthProvider>
                                <Toaster position="top-right"></Toaster>
                                <MainLayout>
                                    {children}
                                </MainLayout>
                            </AuthProvider>
                        </Suspense>
                    </ThemeProvider>
                </ProgressBarProvider>
            </body>
        </html>
    );
}
