'use client'

import { Album } from "@prisma/client"
import { useSession } from "next-auth/react"
import Link from "next/link"
import Image from 'next/image';

import { AiOutlineHeart } from 'react-icons/ai'
import { AiFillHeart } from 'react-icons/ai'
import { VscComment } from 'react-icons/vsc'
import { TbSend } from 'react-icons/tb'
import { MdBookmark } from 'react-icons/md'
import { MdBookmarkBorder } from 'react-icons/md'
import { TfiMore } from 'react-icons/tfi'
import { AiFillPlayCircle } from 'react-icons/ai'
import { useState } from "react";

const Post = ({item}:any) => {
    const [toPlay, setToPlay] = useState(false);

    return(
        <>
            <div className="flex flex-row items-center justify-between p-2">
                <div className="flex flex-row items-center gap-5 text-xl lg:text-2xl">
                    <Image
                        className="w-10 h-10 rounded-full object-cover"
                        src={'/etc/profile.jpg'}
                        alt={'x'}
                        priority={true}
                        width={500}
                        height={500}
                    />
                    <span>{item.User.UserName}</span>
                </div>
                <div className="cursor-pointer ">
                    <TfiMore size={20} />
                </div>
            </div>
            <div 
                className="p-5" 
                onMouseEnter={() => setToPlay(!toPlay)}
                onMouseLeave={() => setToPlay(!toPlay)}>

                <div className="relative ">
                    <div className={`absolute flex top-0 left-0 w-full h-full
                    justify-center items-center ${toPlay ? '' : 'hidden'}`}>
                        <Link 
                            href={'/'}
                            className="z-50 border bg-black rounded-full hover:border-green-500 cursor-pointer text-indigo-500 hover:animate-pulse"
                        >
                            <AiFillPlayCircle size={75}/>
                        </Link>
                    </div>
                    <Image
                        className={`object-cover h-auto w-auto ${toPlay? 'blur-sm opacity-75': ''}`}
                        src={item.Cover}
                        alt={''}
                        priority={true}
                        width={550}
                        height={600}
                    />
                </div>
            </div>
            
            <div className="flex justify-center">
                <h1>{`${item.Name} by ${item.Author}`}</h1>
            </div>
            <div className="flex flex-row justify-between p-3 text-xl lg:text-3xl text-black">
                <div className="flex flex-row justify-between gap-5">
                    <div>
                        <AiOutlineHeart />
                    </div>
                    <div>
                        <VscComment />
                    </div>
                    <div>
                        <TbSend />
                    </div>
                </div>
                <div>
                    <MdBookmarkBorder />
                </div>
            </div>
        </>
    )
}

export default Post