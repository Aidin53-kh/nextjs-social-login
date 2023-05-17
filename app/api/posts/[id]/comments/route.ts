import { NextResponse } from "next/server";

import getCurrentUser from "~/lib/getCurrentUser";
import prisma from "~/lib/prismadb";

export async function GET(req: Request, { params }: { params: { id: string } }) {
    const comments = await prisma.comment.findMany({
        where: {
            postId: params.id,
        },
        include: {
            user: {
                select: {
                    name: true,
                    image: true,
                },
            },
        },
    });

    return NextResponse.json({ comments });
}

export async function POST(req: Request, { params }: { params: { id: string } }) {
    const currentUser = await getCurrentUser();
    const body = await req.json();

    if (!currentUser) throw new Error("auth require");
    if (!body.text) throw new Error("Invalid data");

    const post = await prisma.post.update({
        where: {
            id: params.id,
        },
        data: {
            comments: {
                create: {
                    text: body.text,
                    userId: currentUser.id,
                },
            },
        },
    });

    if (!post) throw new Error("post not found");

    return NextResponse.json({ updatedPost: post });
}
