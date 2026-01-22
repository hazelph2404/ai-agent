"use client";

import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import {
  Call,
  CallingState,
  StreamCall,
  StreamVideo,
  StreamVideoClient,
} from "@stream-io/video-react-sdk";
import { LoaderIcon } from "lucide-react";

import { useTRPC } from "@/trpc/client";
import { CallUI } from "./call-ui";

import "@stream-io/video-react-sdk/dist/css/styles.css";
interface Props {
  meetingId: string;
  meetingName: string;
  userId: string;
  userName: string;
  userImage: string;
}

export const CallConnect = ({
  meetingId,
  meetingName,
  userId,
  userName,
  userImage,
}: Props) => {
  const trpc = useTRPC();
  const [client, setClient] = useState<StreamVideoClient>();
  const [call, setCall] = useState<Call>();

  const { mutateAsync: generateToken } = useMutation(
    trpc.meetings.generateToken.mutationOptions(),
  );

  useEffect(() => {
    const _client = new StreamVideoClient({
      apiKey: process.env.NEXT_PUBLIC_STREAM_API_KEY!,
      user: {
        id: userId,
        name: userName,
        image: userImage,
      },
      tokenProvider: generateToken,
    });
    setClient(_client);

    //NOTE
    return () => {
      _client.disconnectUser(); //explain?
      setClient(undefined);
    };

    // Note
  }, [userId, userName, userImage, generateToken]);

  useEffect(() => {
    if (!client) return;

    const _call = client.call("default", meetingId);

    // i don't need await here?
    _call.camera.disable();
    _call.microphone.disable();

    setCall(_call);

    return () => {
      if (_call.state.callingState !== CallingState.LEFT) {
        _call.leave();
        setCall(undefined);
      }
    };
  }, [client, meetingId]);

  if (!client || !call) {
    return (
      <div className="flex items-center justify-center h-full w-full bg-radial from-sidebar-accent to-sidebar">
        <LoaderIcon className="size-6 animate-spin text-white" />
      </div>
    );
  }

  return (
    <StreamVideo client={client}>
      <StreamCall call={call}>
        <CallUI meetingName={meetingName} />
      </StreamCall>
    </StreamVideo>
  );
};
