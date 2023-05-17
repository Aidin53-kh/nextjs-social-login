import Link from "next/link";

import prisma from "~/lib/prismadb";

import { Post, PostContainer } from "~/components/post";
import Container from "~/components/Container";

export default async function Home() {
    const posts = await prisma.post.findMany({
        include: {
            _count: true,
            user: {
                select: {
                    name: true,
                    image: true,
                    id: true,
                },
            },
        },
    });

    return (
        <Container className="px-5">
            <h1 className="my-8 text-2xl font-bold">Home page</h1>
            <div className="mb-8 flex items-center gap-6 text-blue-500">
                <Link href="/dashboard">dashboard (private route)</Link>
            </div>

            <PostContainer>
                {posts.map((post) => (
                    <Post post={post} key={post.id} />
                ))}
            </PostContainer>
        </Container>
    );
}
