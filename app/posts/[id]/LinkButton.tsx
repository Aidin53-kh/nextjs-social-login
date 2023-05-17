"use client";

import { Post, Prisma } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { FaThumbsUp, FaRegThumbsUp } from "react-icons/fa";

interface LikeButtonProps {
    post:
        | Post & {
              _count: Prisma.PostCountOutputType;
          };
    fill: boolean;
}

export default function LikeButton({ post, fill }: LikeButtonProps) {
    const router = useRouter();

    const handleLikePost = () => {
        axios
            .post(`/api/posts/${post?.id}/like`)
            .then(() => {
                router.refresh();
            })
            .catch((error) => {
                toast.error("someting went wrong");
                console.log(error);
            });
    };

    return (
        <>
            {fill ? (
                <FaThumbsUp
                    className="cursor-pointer rounded-full p-2 text-[40px] text-gray-800 hover:bg-gray-100"
                    onClick={handleLikePost}
                />
            ) : (
                <FaRegThumbsUp
                    className="cursor-pointer rounded-full p-2 text-[40px] text-gray-800 hover:bg-gray-100"
                    onClick={handleLikePost}
                />
            )}
            <span>{post._count.likes}</span>
        </>
    );
}
