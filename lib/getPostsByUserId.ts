import prisma from "./prismadb";

export default async function getPostsByUserId(userId: string) {
    const posts = await prisma.post.findMany({
        where: {
            userId,
        },
        include: {
            _count: true,
            user: {
                select: {
                    id: true,
                    name: true,
                    image: true,
                },
            },
        },
    });
    return posts;
}
