'use client'

import { Album } from '@prisma/client'
import { useSession } from "next-auth/react"
import Link from "next/link"
import Image from 'next/image';

const fetchData = async (id:string) => {
  const data = await fetch(`http://localhost:3000/api/albums/${id}`)
  return data.json()
}

export default async function Music() {
  const { data:ClientSession } = useSession();
  try {
    if(ClientSession){
      const userData:Album[] = await fetchData(ClientSession?.user.uid as string);
      return(
        <div className="overflow-auto">
          <div className="dashboard_albums_container">
            {userData.map((item, i) => (
              <div key={i} className="dashboard_album">
                <Link href={`/dashboard/music/${item.id}`}>
                  <Image
                    className="rounded-lg"
                    src={'/ryoichi.jpg'}
                    alt={item.Name}
                    priority={true}
                    width={350}
                    height={350}
                  />

                  <div className="flex flex-col w-full p-5 justify-center items-center">
                    <p className="text-xl font-bold">{`${item.Name} - ${item.Author}`}</p>
                    <p className=" text-gray-800 dark:text-indigo-500">{item.ReleaseDate}</p>
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