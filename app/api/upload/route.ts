import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextApiRequest } from "next";

import * as fs from 'node:fs/promises';
import path from "node:path";

export async function POST(req: NextRequest){
    const f:any = await req.formData()
   
    const obj = Object.fromEntries(f);
    console.log(obj)
    const Author = obj.Author;
    const AlbumName = obj.Name;
    const ReleaseDate = obj.ReleaseDate;

    Object.entries(obj).forEach( async ([key, value]) => {
      
      if(key === 'Cover'){
      
        const img = await value.arrayBuffer();
        const buffer = Buffer.from(img);
        const coverName = `${AlbumName}-${Author}`;
        const extension = '.' + value.type.toString().split('/').pop();

        const localUrl = path.resolve(path.join(process.cwd(), `public/uploads/`));
        const authorUrl = path.resolve(path.join(localUrl, Author))  
        const albumUrl = path.resolve(path.join(authorUrl, AlbumName ))
        const coverUrl = path.resolve(path.join(albumUrl, coverName))

        console.log(localUrl)
        console.log(authorUrl)
        console.log(albumUrl)

        try {
          await fs.readdir(localUrl)
        } catch (error) {     
          await fs.mkdir(localUrl)
        }

        try {
          await fs.readdir(authorUrl)
        } catch (error) {     
          await fs.mkdir(authorUrl)
        }

        try {
          await fs.readdir(albumUrl)
        } catch (error) {
          await fs.mkdir(albumUrl)
        }

        const filePath = (coverUrl + extension);
        fs.writeFile(filePath, buffer);
      }
    })

    return NextResponse.json({})
  } 