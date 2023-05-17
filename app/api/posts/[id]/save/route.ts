import { NextResponse } from "next/server";

import prisma from "~/lib/prismadb";
import getCurrentUser from "~/lib/getCurrentUser";

export async function GET(req: Request, { params }: { params: { id: string } }) {
    const currentUser = await getCurrentUser();

    if (!currentUser) throw new Error("auth require");

    const post = await prisma.post.findUnique({
        where: {
            id: params.id,
        },
        select: {
            favorits: {
                select: {
                    id: true,
                },
            },
        },
    });

    if (!post) throw new Error("post not found");

    if (post.favorits.some((user) => user.id === currentUser.id)) {
        post.favorits = post.favorits.filter((user) => user.id !== currentUser.id);
    } else {
        post.favorits.push({ id: currentUser.id });
    }

    const updatedPost = await prisma.post.update({
        where: {
            id: params.id,
        },
        data: {
            favorits: {
                set: post.favorits,
            },
        },
    });

    return NextResponse.json({ updatedPost });
}
