'use client'

import Link from "next/link"
import Image from "next/image"
import { useState } from "react";

import { IoLogoElectron } from 'react-icons/io5'
import { RiMenu4Fill } from "react-icons/ri";
import { TbMessageCircle2 } from "react-icons/tb";
import { MdBookmarkBorder } from 'react-icons/md'
import { IoMdStarOutline } from 'react-icons/io'
import { AiOutlineHeart, AiOutlineShopping } from "react-icons/ai";
import { FiMusic } from "react-icons/fi";
import { MdClose } from "react-icons/md";

import Dashboard_Header from "./dashboard_header";
import MusicPlayer from "./music_player";

const Dashboard_Sidebar = ({ children }: {
  children: React.ReactNode
}) => {
  const menus = [
    { 
      name: "Music", 
      link: "/dashboard/music", 
      icon: FiMusic,
      sub: [
        { 
          name: "Add Album",
          link: "/dashboard/music/add",
          icon: null
        }
      ] 
    },
    { name: "Messages", link: "/dashboard/messages", icon: TbMessageCircle2 },
    { name: "Favorites", link: "/dashboard/favorites", icon: IoMdStarOutline },
    { name: "Store", link: "/dashboard/store", icon: AiOutlineShopping, margin: true },
  ];

  const [open, setOpen] = useState(true);

  return(
    <div className="flex">
      <div className={`dashboard_sidebar ${open ? "w-20" : "w-40 lg:w-72"}
      `}>
        <div className="flex flex-col items-center">
          <Link href={'/dashboard'}>
            <div className="dashboard_sidebar_logo">
              <IoLogoElectron size={30} />
            </div>
          </Link>
          
          <span className="border-b-[1px] border-gray-600 w-full p-2"></span>

          <div className={`dashboard_sidebar_menu_button_container
           ${open ? 'flex' : 'absolute'}`}>
            <RiMenu4Fill
              size={20}
              className={`dashboard_sidebar_menu_button ${open ? '' : 'hidden'}`}
              onClick={() => setOpen(!open)}
            />
          </div>
          <div className={`dashboard_sidebar_menu_button_container
           ${open ? 'absolute' : 'flex'}`}>
            <MdClose
              size={20}
              className={`dashboard_sidebar_menu_button ${open ? 'hidden' : ''}`}
              onClick={() => setOpen(!open)}
            />
          </div>

          <span className="border-b-[1px] border-gray-600 w-full "></span>

          <div className="mt-10 flex flex-col gap-5 relative w-full">
            {menus?.map((menu, i) => (
              <div key={i} className={`${open ? "close_dashboard_sidebar_buttons" : "open_dashboard_sidebar_buttons"}`}>
                <div className="flex flex-row gap-3">
                  <Link href={menu.link} >
                    <i><menu.icon size={20} className={`${open ? '' : 'text-black dark:text-green-400'}`} /></i>
                  </Link>
                  <h1 className={`${open ? 'hidden' : 'font-bold justify-end visible'}`}>{menu.name}</h1>
                </div>
                <div className={`${open ? 'hidden'
                  : 'justify-center col-span-2 flex flex-col mt-5 visible'}`
                }>
                  {menu.sub?.map((subMenu, i) => (
                    <Link key={i} href={subMenu.link}
                      className="ml-4 hover:text-black"
                      onClick={() => setOpen(!open)}>
                      {subMenu.name}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <main className={`${open ? 'ml-20 w-full flex flex-col h-screen' : 'ml-40 lg:ml-72 w-full flex flex-col h-screen'}`}>
        <Dashboard_Header />
        {children}
        {/* <MusicPlayer/> */}
      </main>
    </div>
  )
}

export default Dashboard_Sidebar