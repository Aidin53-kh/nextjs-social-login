import { Post } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { getPostsByUserId } from "~/lib";

interface PostProps {
    post: Awaited<ReturnType<typeof getPostsByUserId>>[0];
}

export default function Post({ post }: PostProps) {
    return (
        <div className="flex flex-col gap-3 rounded-lg border p-3" key={post.id}>
            <div className="flex items-center justify-between pb-4">
                <div className="flex items-center gap-2">
                    <Image
                        className="rounded-full opacity-80"
                        alt="user avatar"
                        src={post.user.image ? post.user.image : "/images/user-placeholder.png"}
                        width="35"
                        height="35"
                    />
                    <div className="mb-1 flex flex-col">
                        <h3 className="truncate text-lg font-semibold text-gray-800">{post.user.name}</h3>
                    </div>
                </div>
                {new Date(post.createdAt).toLocaleDateString()}
            </div>
            {/* {post.image && <img alt="post thumbnail" src={post.image} className="w-full" />} */}
            <Link href={`/posts/${post.id}`} className="text-xl font-semibold">
                {post.title}
            </Link>
            <p>{post.description}</p>
            <div className="flex items-center gap-6">
                <p>comments: {post._count.comments}</p>
                <p>likes: {post._count.likes}</p>
            </div>
        </div>
    );
}
