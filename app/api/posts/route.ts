import { NextResponse } from "next/server";

import prisma from "~/lib/prismadb";

export async function POST(req: Request) {
    const body = await req.json();
    const { title, description, username, image } = body;

    if (!title || !description || !username) {
        throw new Error("Invalid Data");
    }

    const user = await prisma.user.findUnique({
        where: { name: username },
        select: { id: true },
    });

    if (!user) {
        throw new Error("User not found");
    }

    await prisma.post.create({
        data: { title: title as string, description: description as string, userId: user.id, image: image || null },
    });

    return NextResponse.json({ message: "post created" });
}

export async function GET(req: Request) {
    const { username } = await req.json();

    const posts = await prisma.post.findMany({
        where: {
            user: {
                name: username,
            },
        },
    });

    return NextResponse.json({ posts });
}
