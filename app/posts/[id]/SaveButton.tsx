"use client";

import { Post, Prisma } from "@prisma/client";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";

import { toast } from "react-hot-toast";
import { BiBookmarkAltMinus, BiBookmarkAltPlus } from "react-icons/bi";

interface SaveButtonProps {
    fill: boolean;
    post: Post & {
        _count: Prisma.PostCountOutputType;
    };
}

export default function SaveButton({ fill, post }: SaveButtonProps) {
    const router = useRouter();
    const params = useParams();

    const handleSavePost = () => {
        axios
            .get(`/api/posts/${post.id}/save`)
            .then(() => {
                toast.success("post saved");
                router.refresh();
            })
            .catch((error) => {
                toast.error("something went wrong");
                console.log({ error });
            });
    };

    return (
        <>
            {fill ? (
                <BiBookmarkAltMinus
                    className="ml-3 cursor-pointer rounded-full p-2 text-[40px] text-gray-800 hover:bg-gray-100"
                    onClick={handleSavePost}
                />
            ) : (
                <BiBookmarkAltPlus
                    className="ml-3 cursor-pointer rounded-full p-2 text-[40px] text-gray-800 hover:bg-gray-100"
                    onClick={handleSavePost}
                />
            )}
            {post._count.favorits}
        </>
    );
}
