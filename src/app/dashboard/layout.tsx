import React from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import DashboardSidebar  from "@/modules/dashboard/ui/components/dashboard-sidebar";
import DashboardNavbar  from "@/modules/dashboard/ui/components/dashboard-navbar";
interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <DashboardNavbar/>
      {children}
    </SidebarProvider>
  );
}
