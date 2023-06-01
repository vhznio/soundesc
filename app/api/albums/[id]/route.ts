import prisma from "../../../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from 'next/server';



export async function GET(req: NextRequest) {
  const id = req.url.split('/').pop();

  if(!id){
    throw new Error("No hay id de session")
  }

  const albums = await prisma.album.findMany({
    where: {
      userId: id
    },
    select: {
      Name: true,
      Author: true,
      ReleaseDate: true,
      Cover: true,
      id: true
    }
  })

  return NextResponse.json(albums)
}


