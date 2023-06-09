import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

import { promises as fs } from 'fs';
import path from 'path';


type AlbumType= {
  name: string,
  author: string,
  cover: any,
  releaseDate: string,
  tracks: Track[]
  user: {
    connect : {
      id: string
    }
  }
}

type Track = {
    name: string;
    tags: string;
    file: any;
}

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

  var ALBUM_TO_POST:AlbumType = {
    name: name,
    author: author,
    cover: coverShortPath,
    releaseDate: releaseDate,
    tracks: [],
    user: {
      connect: {
        id: id!
      }
    }
  }
  for (const [key, value] of Object.entries(fields)) {
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

      const trackPath = path.join(albumPath, trackName + extension).replace(/\s+/g, '_');
      const trackShortPath = `/uploads/${id}/${name}/${trackName}${extension}`.replace(/\s+/g, '_')
      ALBUM_TO_POST.tracks.push(
        {
          name: trackName,
          tags: '',
          file: trackShortPath
        }
      )
      
      await fs.writeFile(trackPath, buffer);
    }
  }

  const newAlbum = await prisma.album.create({
    data: {
      ...ALBUM_TO_POST,
      tracks: {
        create: ALBUM_TO_POST.tracks
      }
    }
  })

  return NextResponse.json(newAlbum);
}
