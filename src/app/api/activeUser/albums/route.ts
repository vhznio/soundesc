import prisma from "../../../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from "../../auth/[...nextauth]/route";



export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);

  const albums = await prisma.album.findMany({
    where: {
      userId: session?.user.uid!
    },
    select: {
      name: true,
      author: true,
      releaseDate: true,
      cover: true,
      id: true
    }
  })

  return NextResponse.json(albums)
}


