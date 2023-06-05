import { Share_Tech_Mono } from 'next/font/google'
import React from "react";
import Dashboard_Sidebar from '@/src/components/dashboard_sidebar';

const tech = Share_Tech_Mono({
   weight: '400',
   subsets: ['latin']
})

export const metadata = {
    title: '{LitNyo}',
    description: 'Music App',
}

export default function DashboardLayout({ children }: {
    children: React.ReactNode
}) {
    return (
        <>
            <Dashboard_Sidebar>
                {children}
            </Dashboard_Sidebar>        
        </>
    )
}