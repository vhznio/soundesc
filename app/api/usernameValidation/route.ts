import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

export const checkIfUsernameExist = async ( username: string | undefined): Promise<any> => {
    const user = await prisma.user.findUnique({
        where: {
            UserName: username
        }
    })
    return NextResponse.json(JSON.stringify(!user));
}
