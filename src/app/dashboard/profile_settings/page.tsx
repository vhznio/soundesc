'use client'

import { LoginButton, LogoutButton } from "@/src/components/auth_buttons";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

type user = {
    email: string,
    name: string,
}

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
                    <div>Profile Settings</div>
                    <LogoutButton/>
                </div>
                <span className="border-b-[1px] border-gray-600 w-full "></span>
                <div>
                    <h1>Name: {userdata.name}</h1>
                </div>
                </>
            )
        }
    } catch (error) {
        console.log(error)
    }
}

export default Profile_Settings