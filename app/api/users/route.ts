
import { NextResponse } from "next/server"
import bcrypt from 'bcrypt';
import { notFound } from 'next/navigation';
import prisma from "../../../lib/prisma";


export async function POST( request: Request ){
  const body = await request.json();
  
  const {
    UserName,
    Email,
    Albums
  } = body;
  const Password= await bcrypt.hash(body.Password,12);

  const existingUser = await prisma.user.findUnique({
    where: {
      Email,
    }
  })

  if(existingUser){
    return NextResponse.json({error: "Email taken"})
  }

  const user = await prisma.user.create({
    data: {
      UserName,
      Email,
      Password,
      Albums: {
        create: Albums
      }
    },
    include: {
      Albums: true
    }
  });
  
  return NextResponse.json(user)
}

export async function GET(request: Request) {
  const users = await prisma.user.findMany({
    include: {
      Albums:true
    }
  })
  
  return NextResponse.json(users)
}
