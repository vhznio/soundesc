'use client'

import { Album } from '@prisma/client'
import { useSession } from "next-auth/react"
import Link from "next/link"
import Image from 'next/image';
import { Suspense } from 'react';

const fetchData = async () => {
  const data = await fetch(`http://localhost:3000/api/activeUser/albums`)
  return data.json()
}

export default async function Music() {
  const { data:ClientSession } = useSession();
  try {
    if(ClientSession){
      const userData:Album[] = await fetchData();

      return(
        <div className="overflow-auto">
          <div className="dashboard_albums_container">
            {userData.map((item, i) => (
              <div key={i} className="dashboard_album">
                <Link href={`/dashboard/music/${item.id}`}>
                  <Suspense fallback={<p>Test</p>}>
                  <Image
                    className="rounded-lg w-auto h-auto"
                    src={item.cover!}
                    alt={item.name}
                    priority={true}
                    width={350}
                    height={350}
                  />
                  </Suspense>
                  <div className="flex flex-col w-full p-5 justify-center items-center">
                    <p className="text-xl font-bold">{`${item.name} - ${item.author}`}</p>
                    <p className=" text-gray-800 dark:text-indigo-500">{item.releaseDate}</p>
                  </div>
                </Link>
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