import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "~/app/api/auth/[...nextauth]/route";


const prisma = new PrismaClient();

export default async function getCurrentUser() {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
        return null;
    }

    const user = await prisma.user.findUnique({
        where: {
            email: session.user.email as string,
        },
        include: {
            likes: {
                select: {
                    id: true,
                },
            },
            favorits: {
                select: {
                    id: true,
                },
            },
        },
    });

    if (!user) {
        return null;
    }

    return user;
}
