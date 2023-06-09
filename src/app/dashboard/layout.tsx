import React from "react";
import Dashboard_Sidebar from '@/src/components/dashboard_sidebar';

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