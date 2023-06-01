'use client'

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { RiMenu4Fill } from "react-icons/ri";
import { MdClose, MdHelp } from "react-icons/md";
import Logo from "public/Logo.png";
import { FiUserPlus, FiUser } from "react-icons/fi";
import { GoMegaphone } from "react-icons/go"

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false)

    const handleNav = () => {
        setMenuOpen(!menuOpen);
    }
    return (
        <nav className='fixed z-10 w-full h-24 shadow-xl bg-gradient-to- backdrop-blur-xl rounded-lg'>
            <div className='flex justify-between items-center h-full w-full px-4 2xl:px-6'>
                <Link href="/">
                    <Image
                        src={Logo}
                        alt="Logo"
                        width="60"
                        height="75"
                        className="cursor-pointer"
                        priority
                    />
                </Link>
                <div className='hidden sm:flex'>
                    <ul className='hidden sm:flex'>
                        <Link href="/signin">
                            <li className='navbar_header_button'>
                                <button className='rounded-none'>Sign in</button>
                            </li>
                        </Link>
                        <Link href="/register">
                            <li className='navbar_header_button'>Sign up</li>
                        </Link>
                    </ul>
                </div>
                <div onClick={handleNav} className={menuOpen ? 'hidden': 'sm:hidden cursor-pointer text-white hover:animate-pulse duration-100 items-center'}>
                    <RiMenu4Fill size={30} />
                </div>
            </div>
            <div className={
                menuOpen
                    ? "fixed left-0 top-0 w-full sm:hidden h-screen bg-gradient-to-b from-black via-indigo-900 p-2 ease-in duration-500 backdrop-blur "
                    : "fixed left-[-100%] top-0 p-5 ease-in duration-500"
                }
            >
                <div className="flex-none w-full items-center justify-end">
                    <div onClick={handleNav} className="cursor-pointer text-white animate-pulse">
                        <MdClose size={35} />
                    </div>
                </div>
                <div className='flex-col py-5'>
                    <ul>
                        <Link href="/signin">
                            <li onClick={() => setMenuOpen(false)}
                            className='navbar_menu_open_container'>
                                <FiUser className='icon_menu_open'/>
                                Sign in
                            </li>
                        </Link>
                        <Link href="/register">
                            <li onClick={() => setMenuOpen(false)}
                            className='navbar_menu_open_container'
                            >
                                <FiUserPlus className='icon_menu_open'/>Sign up
                            </li>
                        </Link>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar