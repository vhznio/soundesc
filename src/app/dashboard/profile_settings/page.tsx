'use client'

import { LoginButton, LogoutButton } from "@/src/components/auth_buttons";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { TbEdit } from 'react-icons/tb'

const fetchData = async () => {
    const data = await fetch(`http://localhost:3000/api/activeUser`)
    return data.json()
}

async function Profile_Settings () {
    const { data:ClientSession } = useSession();

    try {
        if(ClientSession){
            const userdata = await fetchData();
            return (
                <>
                <div className="flex justify-between items-center text-xl p-10">
                    <div className="text-indigo-300">Profile Settings</div>
                    <LogoutButton/>
                </div>
                <span className="border-b-[1px] border-gray-600 w-full "></span>
                <div className="w-full  p-10">
                    <div className="text-xl flex flex-col gap-4">
                        <div 
                            className="flex text-indigo-300 justify-between items-center p-5 rounded-md bg-gray-600">
                            <div className="flex gap-8 items-center">
                                <p>Photo:</p>
                                <Image
                                    className="w-10 h-10 rounded-full object-cover"
                                    src={'/etc/profile.jpg'}
                                    alt={'x'}
                                    placeholder="blur"
                                    blurDataURL="/etc/profile.jpg"
                                    width={500}
                                    height={500}
                                />
                            </div>
                            <Link href={`/dashboard/profile_settings/edit_name`}>
                                <TbEdit
                                    className="cursor-pointer"
                                    
                                    size={25}
                                />
                            </Link>
                        </div>
                        <div 
                            className="flex text-indigo-300 justify-between items-center p-5 rounded-md bg-gray-600">
                            <div className="flex gap-5">
                                <p>Name:</p>
                                <p className="text-green-500">
                                    {userdata.name}
                                </p>
                            </div>
                            <Link href={`/dashboard/profile_settings/edit_name`}>
                                <TbEdit
                                    className="cursor-pointer"
                                    
                                    size={25}
                                />
                            </Link>
                        </div>
                        
                        <div 
                            className="flex text-indigo-300 justify-between items-center p-5 rounded-md bg-gray-600">
                            <div className="flex gap-5">
                                <p>Email:</p>
                                <p className="text-green-500">
                                    {userdata.email}
                                </p>
                            </div>
                            <Link href={`/dashboard/profile_settings/edit_email`}>
                                <TbEdit
                                    className="cursor-pointer"
                                    size={25}
                                />
                            </Link>
                        </div>
                    </div>
                </div>
                </>
            )
        }
    } catch (error) {
        console.log(error)
    }
}

export default Profile_Settings