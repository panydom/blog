"use client";
import { type ComponentProps } from "react";
import { ThemeProvider as NextThemeProvider } from "next-themes";
import { useEffect } from "react";

export function ThemeProvider({ children, ...props }: ComponentProps<typeof NextThemeProvider>) {
    useEffect(() => {
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        document.cookie = "user-timezone=" + timezone;
    }, []);
    return (
        <NextThemeProvider {...props}>
            {children}
        </NextThemeProvider>
    );
}
