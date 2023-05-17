import getCurrentUser from "./getCurrentUser";
import prisma from "~/lib/prismadb";

export default async function getMyFavorits() {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        throw new Error("auth require");
    }

    const favorits = await prisma.post.findMany({
        where: {
            id: {
                in: currentUser.favorits.flatMap((p) => p.id),
            },
        },
        include: {
            _count: true,
            user: {
                select: { name: true, image: true, id: true },
            },
        },
    });

    return favorits;
}
