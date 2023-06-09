import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import prisma from "~/lib/prismadb";

export async function POST(req: Request) {
    const { email, password, name } = await req.json();
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
        data: { email, name, hashedPassword },
    });

    return NextResponse.json(user);
}
