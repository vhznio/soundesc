import { Share_Tech_Mono } from 'next/font/google'
import React, { Suspense } from "react";
import Dashboard_Header from "@/components/dashboard_header";
import Dashboard_Sidebar from '@/components/dashboard_sidebar';
import { PlayGround, PlayerProvider } from '@/components/Player';

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
        <Dashboard_Sidebar>{children}</Dashboard_Sidebar>
        <PlayerProvider>
          <PlayGround />
        </PlayerProvider>
      </>
    );
}