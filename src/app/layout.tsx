import './globals.css' 
import React from "react";
import { Share_Tech_Mono } from 'next/font/google'
import { NextAuthProvider } from './providers';

const tech = Share_Tech_Mono({
   weight: '400',
   subsets: ['latin']
})

export const metadata = {
  title: '{LitNyo}',
  description: 'Music App',
}

export default function RootLayout({children,}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${tech.className} `}>
      <body className='body' >
        <NextAuthProvider>
          {children}
        </NextAuthProvider>
      </body>
    </html>
  )
}
