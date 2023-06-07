import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

export async function GET(req: Request) {
  //Null Handler of users  
  const albums = await prisma.album.findMany({
    orderBy: {
      createdAt: 'asc'
    },
    select: {
      name: true,
      author: true,
      cover: true,
      releaseDate: true,
      createdAt: true,
      tracks: true,
      user:{
        select:{
          name: true
        }
      }
    }
  })
  return NextResponse.json(albums)
}


