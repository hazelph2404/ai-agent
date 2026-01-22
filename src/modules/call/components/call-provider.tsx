"use client";
import { useState, useEffect } from "react";
import { authClient } from "@/lib/auth-client"; 
import { LoaderIcon } from "lucide-react";
import { CallConnect } from "./call-connect";
import { generateAvatarUri } from "@/lib/avatar";

interface Props {
  meetingId: string;
  meetingName: string;
}

export const CallProvider = ({ 
  meetingId, 
  meetingName, 
}: Props) => {
  const [isMounted, setIsMounted] = useState(false);
  const { data, isPending } = authClient.useSession();

  useEffect(() => {
    setIsMounted(true);
  }, []);


  if (!isMounted || !data || isPending) {
    return (
      <div className="flex items-center justify-center h-full w-full bg-gradient-to-br from-sidebar-accent to-sidebar">
        <LoaderIcon className="size-6 animate-spin text-white"/>
      </div>
    );
  }


  return <CallConnect meetingId={meetingId} meetingName={meetingName} userId={data.user.id}
  userName={data.user.name}
  userImage={data.user.image ?? generateAvatarUri({seed: data.user.name, variant: "initials"})}/>
};