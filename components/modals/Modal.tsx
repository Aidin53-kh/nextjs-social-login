"use client";

import Image from "next/image";

interface ModalProps {
    title?: string;
    isOpen: boolean;
    onClose?: () => void;
    body?: React.ReactElement;
    footer?: React.ReactElement;
    withLogo?: boolean;
}

export default function Modal({ title, isOpen, onClose, body, footer, withLogo }: ModalProps) {
    if (!isOpen) return null;

    return (
        <>
            <div
                className="absolute inset-0 flex items-center justify-center bg-black/30 transition"
                onClick={onClose}
            ></div>
            <div className="absolute top-1/2 left-1/2 z-10 w-full max-w-[700px] -translate-y-1/2 -translate-x-1/2 rounded-lg bg-white">
                <div className="flex items-center justify-center p-6">
                    {withLogo ? (
                        <Image alt="logo" src="/images/logo.png" width="100" height="100" className="mt-4" />
                    ) : (
                        <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
                    )}
                </div>
                <main className="px-6">{body}</main>
                <footer className="px-6">{footer}</footer>
            </div>
        </>
    );
}
