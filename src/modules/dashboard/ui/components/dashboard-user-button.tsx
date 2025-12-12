"use client";

import GeneratedAvatar from '@/components/generated-avatar'
import { Button } from "@/components/ui/button";
import { authClient } from '@/lib/auth-client';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator , DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { ChevronDown } from "lucide-react";
import Link from 'next/link';

export const DashboardUserButton = () => {
  const { data, isPending } = authClient.useSession();
  if (isPending) return null;

  const user = data?.user;
  const name = user?.name ?? "Guest";
  const email = user?.email ?? "";
  const seed = name;
  const image = user?.image;

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

            <ChevronDown className="size-2 opacity-50" />
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-48" side="right" align="start">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />

            {/* Settings Pop-up*/}
            <DropdownMenuItem asChild>
                <Link href="/settings"> Settings </Link>
            </DropdownMenuItem>


            <DropdownMenuItem asChild>
                <Link href="/billing"> Billing </Link>
            </DropdownMenuItem>

            <DropdownMenuItem onClick={() => authClient.signOut({ redirectTo: "/sign-in" })} className="text-red-500 focus:text-red-600">
                Sign out
            </DropdownMenuItem>

        </DropdownMenuContent>

        </DropdownMenu>

  );
};
