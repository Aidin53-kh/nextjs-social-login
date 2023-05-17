import prisma from "./prismadb";

export default async function getPostById(postId: string) {
    const post = await prisma.post.findUnique({
        where: {
            id: postId,
        },
        include: {
            _count: true,
        },
    });

    return post;
}
