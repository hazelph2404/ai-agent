"use client";

import { useEffect, useState, useMemo } from "react";
import {
  StreamCall,
  StreamTheme,
  SpeakerLayout,
  CallControls,
} from "@stream-io/video-react-sdk";
import { useStreamVideoClient } from "../hooks/use-stream-video-client";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import ErrorState from "@/components/error-state";
import { Loader2Icon } from "lucide-react";
import { MyVideoButton, MyMicrophoneButton } from "../components/call-buttons";
import { CallProvider } from "../components/call-provider";
interface Props {
  meetingId: string;
}

const CallView = ({ meetingId }: Props) => {
  const [token, setToken] = useState<string | null>(null);
  const { data: session } = authClient.useSession();
  const trpc = useTRPC();

  const { data: meeting } = useQuery(
    trpc.meetings.getOne.queryOptions({ id: meetingId }),
  );
  const generateToken = useMutation(
    trpc.meetings.generateToken.mutationOptions({
      onSuccess: (token) => {
        setToken(token);
      },
      onError: (error) => {
        toast.error("Failed to generate token: " + error.message);
      },
    }),
  );
  // FIX: Added flag to prevent infinite loop from useEffect calling setState repeatedly
  const [hasRequestedToken, setHasRequestedToken] = useState(false);

  useEffect(() => {
    // FIX: Only generate token once by checking hasRequestedToken flag
    if (!token && session?.user && !hasRequestedToken) {
      generateToken.mutate();
      setHasRequestedToken(true);
    }
  }, [token, session?.user, hasRequestedToken, generateToken]);

  const client = useStreamVideoClient(
    session?.user?.id || "",
    session?.user?.name || "Guest",
  );

  const call = useMemo(() => {
    if (!client || !token) return null;
    return client.call("default", meetingId);
  }, [client, token, meetingId]);

  useEffect(() => {
    if (!call) return;
    call.join();
    return () => {
      call.leave().catch(console.error);
    };
  }, [call]);

  if (!meeting) {
    return (
      <div className="h-screen flex flex-col items-center justify-center gap-y-2">
        <Loader2Icon className="size-6 animate-spin text-muted-foreground" />
        <p className="text-sm text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (meeting.status === "completed") {
    return (
      <ErrorState
        title="Meeting Ended"
        description="This meeting has already finished."
      />
    );
  }

  if (!call || !client) {
    return (
      <div className="h-screen flex flex-col items-center justify-center gap-y-2">
        <Loader2Icon className="size-6 animate-spin text-muted-foreground" />
        <p className="text-sm text-muted-foreground">Loading...</p>
      </div>
    );
  }

  return <CallProvider meetingId={meetingId} meetingName={meeting.name} />;
};

export default CallView;
