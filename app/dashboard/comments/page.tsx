import { Comment } from "~/components/comment";
import { getMyComments } from "~/lib";

export default async function Comments() {
    const comments = await getMyComments();

    return (
        <div>
            <h1 className="mn-8 my-12 text-2xl font-semibold">My Comment</h1>

            {comments.map((comment) => (
                <Comment comment={comment} key={comment.id} />
            ))}
        </div>
    );
}
