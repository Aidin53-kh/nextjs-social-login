import { NextResponse } from "next/server";
import prisma from "~/lib/prismadb";

export async function GET() {
    const users = await prisma.user.findMany();
    return NextResponse.json({ users });
}
