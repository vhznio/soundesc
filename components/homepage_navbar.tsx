'use client'

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { RiMenu4Fill } from "react-icons/ri";
import { MdClose, MdHelp } from "react-icons/md";
import { FiUserPlus, FiUser } from "react-icons/fi";
import { GoMegaphone } from "react-icons/go"

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false)

    const handleNav = () => {
        setMenuOpen(!menuOpen);
    }
    return (
        <nav className={`fixed z-10 w-full h-20 items-center flex shadow-xl bg-gradient-to- backdrop-blur-xl rounded-lg`}>
            <div className='flex justify-between w-full p-2'>
                <div className=''>              
                    {/* <Image
                        src='/Logo.png'
                        alt="Logo"
                        width={50}
                        height={50}
                        className="cursor-pointer h-auto w-auto"
                        priority
                    />                   */}
                </div>
                <div>
                    <Link href="/signin">                           
                        <div className={`hidden sm:navbar_header_button`}>Sign in</div>                          
                    </Link>
                    <Link href="/register">                          
                        <div className={`hidden sm:navbar_header_button`}>Sign up</div>                         
                    </Link>
                </div>          
            </div>
            <div onClick={handleNav} 
                className={
                    menuOpen ? 'hidden': 'sm:hidden cursor-pointer mr-5 text-white hover:animate-pulse duration-100 items-center'}>
                <RiMenu4Fill size={30} />
            </div>
            <div className={
                menuOpen
                    ? "fixed left-0 top-0 w-full sm:hidden h-screen select-none"
                    : "fixed left-[-100%] h-screen top-0 p-5  select-none z-20"
                }
            >
                <div className="h-20 flex justify-end items-center mr-5">
                    <div 
                        onClick={handleNav} 
                        className="cursor-pointer text-white animate-pulse">
                        <MdClose size={35} />
                    </div>
                </div>
                <div className='flex flex-col w-full'>
                    <Link href="/signin">                           
                        <div 
                        onClick={() => setMenuOpen(false)}
                        className='navbar_menu_open_container'>
                            <FiUser className='icon_menu_open'/>
                            Sign in
                        </div>                          
                    </Link>
                    <Link href="/register">                          
                        <div 
                        onClick={() => setMenuOpen(false)}
                        className='navbar_menu_open_container'>
                            <FiUserPlus className='icon_menu_open'/>
                            Sign up
                        </div>                         
                    </Link>
                </div> 
            </div>
        </nav>
    )
}

export default Navbar