"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import { toast } from "react-hot-toast";

import type { Comment } from "@prisma/client";

interface ViewCommentsProps {
    postId: string;
    commentCount: number;
}

type GetComment = Comment & {
    user: {
        name: string | null;
        image: string | null;
    };
};

export default function ViewComments({ postId, commentCount }: ViewCommentsProps) {
    const [comments, setComment] = useState<GetComment[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (commentCount !== 0) {
            setLoading(true);
            axios
                .get(`/api/posts/${postId}/comments`)
                .then((res) => setComment(res.data.comments))
                .catch((error) => {
                    toast.error("faild to fetch comment");
                    console.log({ error });
                })
                .finally(() => setLoading(false));
        }
    }, []);

    return (
        <div>
            <h2 className="my-5 text-2xl font-semibold">Comments</h2>
            {loading && "loading comments..."}
            {!loading &&
                comments.map((comment) => (
                    <div className="border-b py-5 px-3">
                        <div className="flex items-center gap-2 pb-4">
                            <Image
                                className="rounded-full opacity-80"
                                alt="user avatar"
                                src={comment.user?.image ? comment.user.image : "/images/user-placeholder.png"}
                                width="35"
                                height="35"
                            />
                            <div className="mb-1 flex flex-col">
                                <h3 className="truncate text-lg font-semibold text-gray-800">{comment.user.name}</h3>
                            </div>
                        </div>
                        <div className="text-lg">
                            <p>{comment.text}</p>
                        </div>
                    </div>
                ))}
        </div>
    );
}
