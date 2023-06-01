import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import formidable from "formidable";
import { NextApiRequest } from "next";


export async function GET(req: Request) {
  //Null Handler of users  
  const albums = await prisma.album.findMany({
    orderBy: {
      createdAt: 'asc'
    },
    select: {
      Name: true,
      Author: true,
      Cover: true,
      ReleaseDate: true,
      createdAt: true,
      User:{
        select:{
          UserName: true
        }
      }
    }
  })
  return NextResponse.json(albums)
}


