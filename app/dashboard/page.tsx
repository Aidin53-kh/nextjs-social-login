import { Post, PostContainer } from "~/components/post";
import { getCurrentUser, getPostsByUserId } from "~/lib";
import DashboardTitle from "./DashboardTitle";

export default async function Dashboard() {
    const currentUser = await getCurrentUser();
    const posts = await getPostsByUserId(currentUser?.id as string);

    return (
        <>
            <DashboardTitle title="Wellcome To Your Dashboard" />

            <PostContainer>
                {posts.map((post) => (
                    <Post post={post} key={post.id} />
                ))}
            </PostContainer>
        </>
    );
}
