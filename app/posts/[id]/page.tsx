import { BiBookmarkAltPlus, BiLike } from "react-icons/bi";

import Container from "~/components/Container";

import { getPostById, getCurrentUser } from "~/lib";

import LikeButton from "./LinkButton";
import AddComment from "./AddComment";
import ViewComments from "./ViewComments";
import SaveButton from "./SaveButton";

export default async function PostDetails({ params }: { params: { id: string } }) {
    const currentUser = await getCurrentUser();
    const post = await getPostById(params.id);

    if (!post) {
        return (
            <div className="mt-20 text-center">
                <h2 className="mb-4 text-xl font-semibold">post not found</h2>
                <p>post id: {params.id}</p>
            </div>
        );
    }

    return (
        <Container>
            <div className="px-5">
                <h1 className="mb-6 mt-12 text-3xl font-bold">{post.title}</h1>
                <p>{post.description}</p>

                <div className="mt-8 flex items-center gap-8 text-lg">
                    <div className="flex items-center gap-1">
                        {!currentUser ? (
                            <>
                                <BiLike className="cursor-not-allowed rounded-full p-2 text-[40px] text-gray-500" />
                                <span>{post._count.likes}</span>
                                <BiBookmarkAltPlus className="ml-3 cursor-not-allowed rounded-full p-2 text-[40px] text-gray-500" />
                                <span>{post._count.favorits}</span>
                            </>
                        ) : (
                            <>
                                <LikeButton post={post} fill={currentUser.likes.some((p) => p.id === post.id)} />
                                <SaveButton post={post} fill={currentUser.favorits.some((p) => p.id === post.id)} />
                            </>
                        )}
                    </div>
                </div>

                <AddComment postId={post.id} />
                <ViewComments postId={post.id} commentCount={post._count.comments} />
            </div>
        </Container>
    );
}
