'use client'
import {useState, useEffect} from 'react'
import Link from "next/link"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import {useSidebar} from '@/components/ui/sidebar'
import {Button} from '@/components/ui/button'
import {PanelLeftCloseIcon, PanelLeftIcon, SearchIcon} from 'lucide-react';
import DashboardCommand from './dashboard-command'
const DashboardNavbar = () => {
  const {isMobile, toggleSidebar, state} = useSidebar();
  const [open, setOpen] = useState(false)

  useEffect( ()=>{
    const down = (e : KeyboardEvent) => {
        if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
            e.preventDefault()
            setOpen(open=>!open)
        }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener( 'keydown', down
    )
  }, [])
  return (
    <div>
        <DashboardCommand open={open} setOpen={setOpen}/>
        <nav className="flex px-4 gap-x-2 items-center py-3 border-b bg-background"> 
                <Button onClick={toggleSidebar} className="size-10" variant="outline">
                    {(state === 'collapsed' || isMobile) ? <PanelLeftIcon className="size-5"/> : <PanelLeftCloseIcon className="size-5"/> } 
                </Button> 

                <Button className="h-9 w-[240px] justify-start font-normal text-muted-foreground hover:text-muted-foreground" variant="outline" onClick={() => setOpen(prev => !prev)}>
                    <SearchIcon className="size-5"/>
                    Search
                    <kbd className="ml-auto pointer-events-node inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium tex-muted-foreground">
                        <span> &#8984; </span> K
                    </kbd>
                </Button> 

        </nav>
 
    </div>
  )
}

export default DashboardNavbar
