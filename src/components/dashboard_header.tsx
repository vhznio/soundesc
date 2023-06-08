'use client'

import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { CgProfile } from 'react-icons/cg'
import { MdLightMode } from 'react-icons/md'
import { MdOutlineLightMode } from 'react-icons/md'


const Dashboard_Header = () => {
    const [theme, setTheme] = useState('dark');
    const { data:ClientSession } = useSession();
    
    useEffect(() => {
        if(theme === 'dark'){
            document.documentElement.classList.add('dark');
        }else{
            document.documentElement.classList.remove('dark');
        }
    },[theme])

    const handleThemeSwitch = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark')
    }

    return (
        <div className="dashboard_header_container border-indigo-800 border-b">
            <div className='dashboard_header_title'>
                <h2>{ClientSession?.user.name}</h2>
            </div>
            <div className='flex flex-row gap-3 lg:gap-10 items-center'>
                <div onClick={handleThemeSwitch} className="dashboard_header_theme_switcher">
                    <MdOutlineLightMode className={`${theme === 'light'? '' : 'hidden'}`}/>
                    <MdLightMode className={`${theme === 'light'? 'hidden' : ''}`}/>
                </div>
                <div className="dashboard_header_profile_button">
                    <Link href={'/dashboard/profile_settings'}>
                        <CgProfile size={35}/>
                    </Link>
                </div>
            </div>

        </div>
    )
}

export default Dashboard_Header