"use client";

import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export default function Input({ className, ...props }: InputProps) {
    return <input type="text" className={`block w-full rounded-lg border p-4 text-lg ${className || ""}`} {...props} />;
}
