import getCurrentUser from "./getCurrentUser";

import prisma from "~/lib/prismadb";

export default async function getLikedPosts() {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        throw new Error("auth require");
    }

    const posts = await prisma.post.findMany({
        where: {
            id: {
                in: currentUser.likes.flatMap((post) => post.id),
            },
        },
        include: {
            _count: true,
            user: {
                select: {
                    id: true,
                    image: true,
                    name: true,
                },
            },
        },
    });

    return posts;
}
