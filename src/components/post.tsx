'use client'

import { Album } from "@prisma/client"
import { useSession } from "next-auth/react"
import Link from "next/link"
import Image from 'next/image';

import { AiOutlineHeart, AiFillHeart, AiFillPlayCircle } from 'react-icons/ai'
import { IoMdStarOutline, IoMdStar } from 'react-icons/io'
import { VscComment } from 'react-icons/vsc'
import { TbSend } from 'react-icons/tb'
import { TfiMore } from 'react-icons/tfi'

import { useState } from "react";
import { Suspense } from "react";

const Post = ({item}:any) => {
    const [toPlay, setToPlay] = useState(false);
    const [dropMenu, setDropMenu] = useState(false);
    const [like, setLike] = useState(false);
    const [fav, setFav] = useState(false);

    const [likeCount, setLikeCount] = useState(1);


    const handleDropMenu = () => {
        setDropMenu(!dropMenu)
    }

    const handleLikes = () => {
        setLike(!like)
        like ? setLikeCount((prev) => prev + 1) : setLikeCount((prev) => prev - 1)
        
        console.log(likeCount)
        console.log(item)
    }

    const handleComments = () => {

    }

    const handleSends = () => {

    }

    const handleFavorites = () => {
        setFav(!fav)
    }

    return(
        <>
            <div className="flex flex-row items-center justify-between p-2 select-none">
                <div className="flex flex-row items-center gap-5 text-xl lg:text-2xl">
                    <Image
                        className="w-10 h-10 rounded-full object-cover"
                        src={'/etc/profile.jpg'}
                        alt={'x'}
                        placeholder="blur"
                        blurDataURL="/etc/profile.jpg"
                        width={500}
                        height={500}
                    />
                    <Link href={'/'}>
                        <span className="cursor-pointer">{item.user.name}</span>
                    </Link>
                </div>
                <div 
                    onClick={handleDropMenu}
                    className="cursor-pointer relative">
                    <TfiMore size={20} />
                    {dropMenu ? 
                        <div className="bg-gray-500 rounded-sm text-black top-5 -left-20 absolute z-30">
                            <ul className=" p-5 gap-5 flex flex-col">
                                <li className="hover:text-green-500 border-b-2 border-gray-600">Profile</li>
                                <li className="hover:text-green-500 border-b-2 border-gray-600">Coffee</li>
                                <li className="hover:text-green-500 border-b-2 border-gray-600">Block</li>
                            </ul>
                        </div>
                    : 
                    ''
                    }
                </div>
            </div>
            <div 
                className="p-2" 
                onMouseEnter={() => setToPlay(!toPlay)}
                onMouseLeave={() => setToPlay(!toPlay)}>

                <div className="relative select-none">
                    <div 
                    className={`absolute flex top-0 left-0 w-full h-full
                    justify-center items-center ${toPlay ? 'z-50' : 'hidden'}`}>
                        <Link 
                            href={'/'}
                            className=" border bg-black rounded-full hover:border-green-500 cursor-pointer text-indigo-500 hover:animate-pulse"
                        >
                            <AiFillPlayCircle size={75}/>
                        </Link>
                    </div>
                    <div className="flex justify-center items-center">
                        <Image 
                            className={`object-cover rounded-md h-auto w-auto md:max-w-lg ${toPlay? 'blur-sm opacity-75 z-10': ''}`}
                            src={item.cover}
                            alt={''}
                            placeholder="blur"
                            blurDataURL={item.cover}
                            width={450}
                            height={450}
                        />
                    </div>
                </div>
            </div>
            
            <div className="flex justify-center select-none">
                <h1>{`${item.name} by ${item.author}`}</h1>
            </div>
            <div className="flex flex-row justify-between p-2 text-xl lg:text-3xl text-black">
                <div className="flex flex-row justify-between gap-5">
                    <div>
                        <AiOutlineHeart 
                        onClick={handleLikes}
                        className={`cursor-pointer ${like ? 'hidden' : ''}`}
                        size={30}/>
                        <AiFillHeart
                         onClick={handleLikes}
                         className={`cursor-pointer ${like ? 'text-red-800 ' : 'hidden '}`}
                         size={30}/>
                    </div>
                    <div>
                        <VscComment 
                        onClick={handleComments}
                        className="cursor-pointer"
                        size={30}/>
                    </div>
                    <div>
                        <TbSend 
                        onClick={handleSends}
                        className="cursor-pointer"
                        size={30}/>
                    </div>
                </div>
                <div>
                    <IoMdStarOutline 
                    onClick={handleFavorites}
                    className={`cursor-pointer ${fav ? 'hidden' : ''}`}
                    size={30}/>
                    <IoMdStar 
                    onClick={handleFavorites}
                    className={`cursor-pointer ${fav ? '' : 'hidden'}`}
                    size={30}/>
                </div>
            </div>
        </>
    )
}

export default Post