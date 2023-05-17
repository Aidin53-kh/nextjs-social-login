import { NextResponse } from "next/server";
import getCurrentUser from "~/lib/getCurrentUser";

import prisma from "~/lib/prismadb";

export default async function getMyComments() {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        throw new Error("auth require");
    }

    const comments = await prisma.comment.findMany({
        where: {
            userId: currentUser.id,
        },
        include: {
            user: {
                select: {
                    id: true,
                    name: true,
                    image: true,
                },
            },
            post: {
                select: {
                    title: true,
                    user: {
                        select: {
                            name: true,
                            image: true,
                            id: true,
                        },
                    },
                    createdAt: true,
                    id: true,
                },
            },
        },
    });

    return comments;
}
