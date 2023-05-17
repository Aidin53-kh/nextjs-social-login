"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { toast } from "react-hot-toast";
import axios from "axios";

import { useRegisterModal } from "~/hooks/useRegisterModal";

import Button from "../Button";
import Input from "../Input";
import Modal from "./Modal";

export default function RegisterModal() {
    const registerModal = useRegisterModal();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = () => {
        axios
            .post("/api/register", { name: username, email, password })
            .then(() => {
                registerModal.onClose();
                toast.success("registered successfully");
            })
            .catch((error) => {
                console.log({ error });
                toast.error("Something went wrong !");
            });
    };

    const bodyContent = (
        <div className="mb-12">
            <h2 className="my-2 text-2xl font-bold text-gray-800">Wellcome To Diginext</h2>
            <p className="text-gray-400">Register your account</p>

            <div className="my-8 flex flex-col gap-5">
                <Input
                    placeholder="Username"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
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
        <Modal
            isOpen={registerModal.isOpen}
            body={bodyContent}
            onClose={registerModal.onClose}
            title="Register"
            withLogo
        />
    );
}
