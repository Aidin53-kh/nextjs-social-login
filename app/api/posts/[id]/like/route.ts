import { NextResponse } from "next/server";

import getCurrentUser from "~/lib/getCurrentUser";
import prisma from "~/lib/prismadb";

export async function POST(req: Request, { params }: { params: { id: string } }) {
    const currentUser = await getCurrentUser();

    if (!currentUser) throw new Error("auth require");

    const post = await prisma.post.findUnique({
        where: {
            id: params.id,
        },
        include: {
            likes: {
                select: {
                    id: true,
                },
            },
        },
    });

    if (!post) throw new Error("post not found");

    if (post.likes.some((user) => user.id === currentUser.id)) {
        post.likes = post.likes.filter((user) => user.id !== currentUser.id);
    } else {
        post.likes.push({ id: currentUser.id });
    }

    const updatedPost = await prisma.post.update({
        where: {
            id: params.id,
        },
        data: {
            likes: {
                set: post.likes,
            },
        },
    });

    return NextResponse.json({ updatedPost });
}
