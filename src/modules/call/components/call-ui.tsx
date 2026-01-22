"use client";

import { useState } from "react";
import {
  useCall,
  SpeakerLayout,
  CallControls,
  StreamTheme,
} from "@stream-io/video-react-sdk";

import { CallLobby } from "./call-lobby";
import { CallActive } from "./call-active";

interface Props {
  meetingName: string;
}

export const CallUI = ({ meetingName }: Props) => {
  const call = useCall();
  const [show, setShow] = useState<"lobby" | "call" | "ended">("lobby");

  const handleJoin = async () => {
    if (!call) return;

    try {
      await call.join();
      setShow("call");
    } catch (error) {
      console.error("Failed to join call:", error);
    }
  };

  const handleLeave = async () => {
    if (!call) return;

    await call.leave();
    setShow("ended");
    window.location.assign("/");
  };

  return (
    <StreamTheme>
      <main className="min-h-screen w-full flex flex-col bg-slate-50">
        {show === "lobby" && (
          <div>
            <CallLobby onJoin={handleJoin} />
          </div>
        )}

        {show === "call" && (
          <CallActive onLeave={handleLeave} meetingName={meetingName} />
        )}

        {show === "ended" && (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-xl font-semibold text-muted-foreground">
              Meeting has ended.
            </p>
          </div>
        )}
      </main>
    </StreamTheme>
  );
};
