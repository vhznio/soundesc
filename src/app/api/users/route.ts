
import { NextResponse } from "next/server"
import bcrypt from 'bcrypt';
import { notFound } from 'next/navigation';
import prisma from "../../../lib/prisma";


export async function POST( request: Request ){
  const body = await request.json();
  
  const {
    name,
    email,
    albums
  } = body;
  const password= await bcrypt.hash(body.password,12);

  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    }
  })

  if(existingUser){
    return NextResponse.json({error: "Email taken"})
  }

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password,
      albums: {
        create: albums
      }
    },
    include: {
      albums: true
    }
  });
  
  return NextResponse.json(user)
}

export async function GET(request: Request) {
  const users = await prisma.user.findMany({
    include: {
      albums:true
    }
  })
  
  return NextResponse.json(users)
}
