"use client";

import {  useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { signOut } from "next-auth/react";

import { useUser, useLoginModal, useRegisterModal } from "~/hooks";
import Container from "../Container";

export default function Navbar() {
    const router = useRouter();
    const { currentUser, status } = useUser();

    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();

    const [openUserMenu, setOpenUserMenu] = useState(false);

    const userMenu =
        openUserMenu && status === "authenticated" ? (
            <>
                <div className="fixed inset-0 z-10" onClick={() => setOpenUserMenu(false)}></div>
                <div className="absolute right-0 z-20 min-w-[300px] rounded-xl bg-white p-4 shadow-xl">
                    <div className="flex items-center gap-2 border-b pb-4">
                        <Image
                            className="rounded-full opacity-80"
                            alt="user avatar"
                            src={currentUser?.image ? currentUser.image : "/images/user-placeholder.png"}
                            width="55"
                            height="55"
                        />
                        <div className="mb-1 flex flex-col">
                            <h3 className="truncate text-lg font-semibold text-gray-800">{currentUser?.name}</h3>
                            <p className="truncate text-sm text-gray-500">{currentUser?.email}</p>
                        </div>
                    </div>
                    <div className="my-4 flex flex-col gap-1">
                        <div className="cursor-pointer rounded-lg px-5 py-2 font-semibold hover:bg-gray-100">
                            Favorits
                        </div>
                        <div className="cursor-pointer rounded-lg px-5 py-2 font-semibold hover:bg-gray-100">
                            Settings
                        </div>
                        <Link
                            href="/dashboard"
                            className="cursor-pointer rounded-lg px-5 py-2 font-semibold hover:bg-gray-100"
                        >
                            Dashboard
                        </Link>
                    </div>
                    <hr />
                    <div
                        className="mt-4 cursor-pointer rounded-lg px-5 py-2 font-semibold text-rose-500 hover:bg-rose-50"
                        onClick={() => signOut({ redirect: false }).then(() => router.refresh())}
                    >
                        Logout
                    </div>
                </div>
            </>
        ) : null;

    return (
        <div className="border-b bg-white">
            <Container>
                <div className="flex h-[60px] items-center justify-between px-5">
                    <Link href="/">
                        <Image alt="logo" src="/images/logo.png" width={100} height={31.25} />
                    </Link>

                    <div className="relative flex gap-1 rounded-full border p-1">
                        {status === "authenticated" ? (
                            <>
                                <button
                                    className="rounded-full px-3 py-1 text-sm font-semibold transition hover:bg-gray-100"
                                    onClick={() => setOpenUserMenu(true)}
                                >
                                    {currentUser?.name}
                                </button>
                                <Image
                                    className="mr-[2px] cursor-pointer rounded-full opacity-80 hover:bg-gray-100"
                                    alt="user avatar"
                                    src={currentUser?.image ? currentUser.image : "/images/user-placeholder.png"}
                                    width="35"
                                    height="35"
                                    onClick={() => setOpenUserMenu(true)}
                                />
                                {userMenu}
                            </>
                        ) : (
                            <>
                                <button
                                    className="rounded-full px-3 py-1 text-sm font-semibold transition hover:bg-gray-100"
                                    onClick={loginModal.onOpen}
                                >
                                    Login
                                </button>
                                <button
                                    className="rounded-full px-3 py-1 text-sm font-semibold transition hover:bg-gray-100"
                                    onClick={registerModal.onOpen}
                                >
                                    Register
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </Container>
        </div>
    );
}
