"use client";

import GeneratedAvatar from '@/components/generated-avatar'
import { Button } from "@/components/ui/button";
import { authClient } from '@/lib/auth-client';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator , DropdownMenuItem } from '@/components/ui/dropdown-menu'
import {Drawer, DrawerTitle,  DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader,DrawerTrigger, DrawerClose} from '@/components/ui/drawer'
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { ChevronDown, CreditCardIcon, LogOut} from "lucide-react";
import {useIsMobile} from '@/hooks/use-mobile'
import Link from 'next/link';
import { useRouter } from "next/navigation";
export const DashboardUserButton = () => {
    const router = useRouter();
    const { data, isPending } = authClient.useSession();
    const isMobile = useIsMobile();


    const user = data?.user;
    const name = user?.name ?? "Guest";
    const email = user?.email ?? "";
    const seed = name;
    const image = user?.image;
    if (isPending || !user) return null;

    const onLogOut = async () => {
        await authClient.signOut();
        router.push("/auth/sign-in");
      };
    if (isMobile) {
        return (
            <Drawer>
                {/* Click to open drawer! */}
                <DrawerTrigger className="rounded-lg border border-border/10 p-6 w-full flex items-center justify-between bg-white/5 hover:bg-white/10 overflow-hidden">
                    <div className="flex items-center gap-2">
                        {image ? (
                        <Avatar className="size-8">
                            <AvatarImage src={image} alt="avatar" />
                        </Avatar>
                        ) : (
                        <GeneratedAvatar seed={seed} className="size-8" />
                        )}

                    <div className="flex flex-col gap-0.10 text-left overflow-hidden flex-1 min-w-0">
                        <p className="truncate">{name}</p>
                        <p className="text-xs text-muted-foreground truncate">{email}</p>
                    </div>
                </div>
                </DrawerTrigger>
                {/* Drawer Content */}
                {user ? (<DrawerContent>
                    <DrawerHeader> 
                        <DrawerTitle>{name}</DrawerTitle>
                        <DrawerDescription>{email}</DrawerDescription>
                    </DrawerHeader>        

                    <DrawerFooter> 
                        <Button variant="outline" onClick={()=>{}}> <CreditCardIcon className="size-4 text-black"/> Billing </Button>
                        <DrawerClose asChild>
                            <Button onClick={onLogOut}> <LogOut/> Log out </Button>
                        </DrawerClose>
                    </DrawerFooter>
                </DrawerContent>) : (null)}
            </Drawer>
        )
    }
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                variant="outline"
                className="rounded-lg border border-border/10 p-6 w-full flex items-center justify-between bg-white/5 hover:bg-white/10 overflow-hidden"
                >
                {/* LEFT SIDE */}
                <div className="flex items-center gap-2">
                    {image ? (
                    <Avatar className="size-8">
                        <AvatarImage src={image} alt="avatar" />
                    </Avatar>
                    ) : (
                    <GeneratedAvatar seed={seed} className="size-8" />
                    )}

                    <div className="flex flex-col gap-0.10 text-left overflow-hidden flex-1 min-w-0">
                    <p className="truncate">{name}</p>
                    <p className="text-xs text-muted-foreground truncate">{email}</p>
                    </div>
                </div>

                {user ? (<ChevronDown className="size-2 opacity-50" />) : (null)}
                </Button>
            </DropdownMenuTrigger>
            {user ? (<DropdownMenuContent className="w-48" side="right" align="start">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />

                {/* Settings Pop-up*/}
                <DropdownMenuItem asChild>
                    <Link href="/settings"> Settings </Link>
                </DropdownMenuItem>


                <DropdownMenuItem asChild>
                    <Link href="/billing"> Billing </Link>
                </DropdownMenuItem>

                <DropdownMenuItem onClick={onLogOut} className="text-red-500 focus:text-red-600">
                    Sign out
                </DropdownMenuItem>

            </DropdownMenuContent>) : (null)}

            </DropdownMenu>

    );
    };
