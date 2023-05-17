"use client";

import { SessionProvider } from "next-auth/react";

import ToastProvider from "./ToastProvider";

import type { User } from "@prisma/client";

interface UserProviderProps {
    children: React.ReactNode;
}

export default function Providers({ children }: UserProviderProps) {
    return (
        <SessionProvider>
            <ToastProvider />
            {children}
        </SessionProvider>
    );
}
