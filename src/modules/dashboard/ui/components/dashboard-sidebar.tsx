"use client";
import React from "react";
import { VideoIcon, BotIcon, StarIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { DashboardUserButton } from "./dashboard-user-button";
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
  },
];
const secondSection = [
  {
    icon: StarIcon,
    label: "Upgrade",
    href: "/upgrade",
  },
];
const DashboardSidebar = () => {
  const pathname = usePathname();
  return (
    <div>
      <Sidebar>
        <SidebarHeader className="text-sidebar-accent-foreground">
          <Link href="/" className="flex items-center gap-2 px-2 pt-2">
            <Image src="/logo.svg" height={36} width={36} alt="Meet AI" />
            <p className="text-2xl font-semibold text-lightgray"> Meet AI </p>
          </Link>
        </SidebarHeader>

        <div className="px-4 py-2">
          <Separator className="opacity-10 text-[#5D6B68]" />
        </div>

        <SidebarContent>
          <SidebarGroup>
            <SidebarMenu>
              {firstSection.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.href}
                    className={cn(
                      "h-10 hover:bg-linear-to-r/oklch border border-transparent hover:border-[#5D6B68]/10 from-sidebar-accent from-[5%] via-[30%] via-sidebar/50 to-sidebar/50",
                      pathname === item.href &&
                        "bg-linear-to-r/oklch border-[#5D6B68]/10",
                    )}
                  >
                    <Link href={item.href} className="flex items-center gap-2">
                      <item.icon />
                      <span className="text-sm font-medium tracking-tight">
                        {item.label}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>

          {/* Second Section */}

          <div className="px-4 py-2">
            <Separator className="opacity-10 text-[#5D6B68]" />
          </div>
          <SidebarGroup>
            <SidebarMenu>
              {secondSection.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.href}
                    className={cn(
                      "h-10 hover:bg-linear-to-r/oklch border border-transparent hover:border-[#5D6B68]/10 from-sidebar-accent from-[5%] via-[30%] via-sidebar/50 to-sidebar/50",
                      pathname === item.href &&
                        "bg-linear-to-r/oklch border-[#5D6B68]/10",
                    )}
                  >
                    <Link href={item.href} className="flex items-center gap-2">
                      <item.icon />
                      <span className="text-sm font-medium tracking-tight">
                        {item.label}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter>
          <DashboardUserButton />
        </SidebarFooter>
      </Sidebar>
    </div>
  );
};
export default DashboardSidebar;
