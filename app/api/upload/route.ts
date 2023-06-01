import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import formidable from 'formidable'
import { NextApiRequest } from "next";
import path from "path";

export function POST(req: NextApiRequest){
    
    const uploadFolder = path.join(__dirname, "public", "files");
  
    // const form = formidable({
    //   multiples: true,
    //   maxFieldsSize: 50 *1024 * 1024,
    //   uploadDir: uploadFolder
    // });
    
    const form = formidable();

    form.parse(req, async (err,fields, files) => {
        
    })
  
    return NextResponse.json({})
  } 