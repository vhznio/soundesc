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


const fetchData = async () => {
  const data = await fetch(`http://localhost:3000/api/albums`)
  return data.json()
}

export default async function Dashboard() {
  const { data:ClientSession } = useSession();
  const regx = /[ T*",.]/

  try {
    if(ClientSession){
      const usersData:any[] = await fetchData();
     
      return(
        <div className="overflow-auto bg-gradient-to-t from-gray-600 from-5% via-gray-500 to-gray-600 ">
          <div className="dashboard_feed_container">
            {usersData.map((item, i) => (
              <div key={i} className="dashboard_feed_post">
                <div className="flex flex-row items-center justify-between p-2">
                  <div className="flex flex-row items-center gap-5 text-xl lg:text-2xl">
                    <Image
                        className="w-10 h-10 rounded-full object-cover"
                        src={'/profile.jpg'}
                        alt={item.name}
                        priority={true}
                        width={500}
                        height={500}
                    />
                    <span>{item.User.name}</span>
                  </div>
                  <div className="cursor-pointer ">
                    <TfiMore size={20}/>
                  </div>
                </div>
                <div className="flex justify-center items-center">
                    <Image
                        className="object-cover"
                        src={'/ryoichi.jpg'}
                        alt={item.name}
                        priority={true}
                        width={550}
                        height={600}
                    />
                </div>
                
                <div className="flex flex-row justify-between p-3 text-xl lg:text-3xl text-black">
                  <div className="flex flex-row justify-between gap-5">
                    <div>
                      <AiOutlineHeart/>
                    </div>
                    <div>
                      <VscComment/>
                    </div>
                    <div>
                      <TbSend/>
                    </div>
                  </div>
                  <div>
                    <MdBookmarkBorder/>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    }
  } catch (error) {
    console.log(error)
  }
} 