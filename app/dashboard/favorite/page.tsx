import { Post, PostContainer } from "~/components/post";
import { getMyFavorits } from "~/lib";

export default async function Favorits() {
    const favoritsPosts = await getMyFavorits();

    return (
        <>
            <h1 className="mb-8 mt-12 text-2xl font-semibold">My Favorite Posts</h1>
            <PostContainer>
                {favoritsPosts.map((post) => (
                    <Post post={post} key={post.id} />
                ))}
            </PostContainer>
        </>
    );
}
