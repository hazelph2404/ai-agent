"use client"
import React from 'react'
import { VideoIcon, BotIcon, StarIcon } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import {Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem} from "@/components/ui/sidebar";
import {Separator} from '@/components/ui/separator' 
const firstSection = [
    {
        icon: VideoIcon,
        label: "Meetings", 
        href: "/meetings",
    }, 
    {
        icon: BotIcon,
        label: "Agents", 
        href: "/agents",
    }
]
const secondSection = [
    {
        icon: StarIcon,
        label: "Meetings", 
        href: "/meetings",
    }, 

]
const DashboardSidebar = () => {
  return (
    <div>
        <Sidebar>
            <SidebarHeader className="text-sidebar-accent-foreground">
            <Link href="/" className="flex items-center gap-2 px-2 pt-2"> 
                <Image src="/logo.svg" height={36} width={36} alt="Meet AI"/>
            </Link>
            </SidebarHeader>
            <div className="px-4 py-2">
                <Separator className="opacity-10 text-[#5D6B68]"/>
            </div>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarMenu>
                        {firstSection.map( (item) => (
                            <SidebarMenuItem key={item.href}> 
                                <SidebarMenuButton>
                                    <Link href={item.href}>
                                    <item.icon/>
                                    <span className="text-sm font-medium tracking-tight"> {item.label} </span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        )
                        )}
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    </div>
  )
}

export default DashboardSidebar