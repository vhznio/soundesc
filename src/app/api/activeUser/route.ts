import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import prisma from "../../../lib/prisma";

export async function GET(req: Request) {
    const session = await getServerSession(authOptions);
    if(session){
        const data = await prisma.user.findUnique({
            where: {
                id: session.user.uid
            },
            select: {
                name: true,
                email: true
            }
        })
        return NextResponse.json(data)
    }
}