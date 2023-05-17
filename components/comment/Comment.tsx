import Image from "next/image";
import Link from "next/link";
import { getMyComments } from "~/lib";

interface CommentProps {
    comment: Awaited<ReturnType<typeof getMyComments>>[0];
}

export default function Comment({ comment }: CommentProps) {
    return (
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
            <div className="mb-3 text-lg">
                <p>{comment.text}</p>
            </div>
            <div className="flex flex-col gap-3 rounded-lg border p-3">
                <div className="flex items-center justify-between pb-4">
                    <div className="flex items-center gap-2">
                        <Image
                            className="rounded-full opacity-80"
                            alt="user avatar"
                            src={comment.post.user.image ? comment.post.user.image : "/images/user-placeholder.png"}
                            width="35"
                            height="35"
                        />
                        <div className="mb-1 flex flex-col">
                            <h3 className="truncate text-lg font-semibold text-gray-800">{comment.post.user.name}</h3>
                        </div>
                    </div>
                    {new Date(comment.post.createdAt).toLocaleDateString()}
                </div>
                <Link href={`/posts/${comment.post.id}`} className="text-xl font-semibold">
                    {comment.post.title}
                </Link>
            </div>
        </div>
    );
}
