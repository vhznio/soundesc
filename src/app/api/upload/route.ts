import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextApiRequest } from "next";

import { promises as fs } from 'fs';
import path from 'path';

export async function POST(req: NextRequest) {

  const form:any = await req.formData();
  const fields = Object.fromEntries(form);

  const { author, name, releaseDate } = fields; 
  const activeUser = await getServerSession(authOptions);
  const id = activeUser?.user.uid;
  

  const invalidData = await prisma.album.findUnique({
    where: {
      name
    }
  })
  if(invalidData){
    return NextResponse.json({error: "Name taken"})
  }

  const uploadsPath = path.join(process.cwd(), 'public/uploads');
  const authorPath = path.join(uploadsPath, id!).replace(/\s+/g, '_');
  const albumPath = path.join(authorPath, name).replace(/\s+/g, '_');
  await fs.mkdir(uploadsPath, { recursive: true });
  await fs.mkdir(authorPath, { recursive: true });
  await fs.mkdir(albumPath, { recursive: true });

  const coverShortPath = `/uploads/${id}/${name}/${name}-${author}.${fields.cover.type.split('/').pop()}`.replace(/\s+/g, '_');
  


  var ALBUM_TO_POST = {
    name: name,
    author: author,
    cover: coverShortPath,
    releaseDate: releaseDate,
    tracks: {
      create: [
        {
          name: '',
          tags: '',
          file: ''
        }
      ]
    },
    user: {
      connect: {
        id
      }
    }
  }


  Object.entries(fields).forEach( async ([key, value]) => {
    
    if (key === 'cover') {
      const imageBuffer = await value.arrayBuffer();
      const buffer = Buffer.from(imageBuffer);
      const coverName = `${name}-${author}`;
      const extension = '.' + value.type.split('/').pop();
      const coverPath = path.join(albumPath, coverName + extension).replace(/\s+/g, '_');
      await fs.writeFile(coverPath, buffer);
    }

    if(key !== 'cover' && key !== 'author' && key !== 'name' && key !== 'releaseDate'){
      const trackName = value.name.split('.').shift()
      const extension = `.${value.name.split('.').pop()}`
      const trackBuffer = await value.arrayBuffer();
      const buffer = Buffer.from(trackBuffer);

      const trackPath = path.join(albumPath, trackName + extension).replace(/\s+/g, '_')
      await fs.writeFile(trackPath, buffer);
     
    }

  })

  console.log(ALBUM_TO_POST)
  const newAlbum = await prisma.album.create({
    data: ALBUM_TO_POST
  })
  
  return NextResponse.json({});
}
