"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { toast } from "react-hot-toast";

import { useLoginModal } from "~/hooks/useLoginModal";

import Button from "../Button";
import Input from "../Input";
import Modal from "./Modal";

export default function LoginModal() {
    const router = useRouter();

    const loginModal = useLoginModal();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = () => {
        signIn("credentials", { email, password, redirect: false }).then((callback) => {
            loginModal.onClose();
            if (callback?.ok) {
                toast.success("Logged in");
                router.refresh();
                return;
            }

            if (callback?.error) {
                toast.error(callback.error);
            }
        });
    };

    const bodyContent = (
        <div className="mb-12">
            <h2 className="my-2 text-2xl font-bold text-gray-800">Wellcome back</h2>
            <p className="text-gray-400">Login to your account</p>

            <div className="my-8 flex flex-col gap-5">
                <Input
                    placeholder="Email"
                    name="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                    placeholder="Password"
                    name="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>

            <Button onClick={handleRegister}>Continue</Button>

            <div className="my-8 flex items-center gap-4">
                <hr className="grow" />
                <span className="font-semibold text-gray-600">OR</span>
                <hr className="grow" />
            </div>

            <div className="flex flex-col gap-5">
                <button
                    className="avtive:bg-rose-500 block w-full rounded-lg border-2 border-gray-900 bg-white p-3 font-semibold text-gray-900 shadow-lg hover:bg-gray-100"
                    onClick={() => signIn("github")}
                >
                    Continue With Github
                </button>
                <button
                    className="avtive:bg-rose-500 block w-full rounded-lg border-2 border-gray-900 bg-white p-3 font-semibold text-gray-900 shadow-lg hover:bg-gray-100"
                    onClick={() => {}}
                >
                    Continue With Google
                </button>
            </div>
        </div>
    );

    return (
        <Modal isOpen={loginModal.isOpen} body={bodyContent} onClose={loginModal.onClose} title="Register" withLogo />
    );
}
