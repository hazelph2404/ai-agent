"use client";

import { useEffect, useState } from "react";
import { StreamVideoClient, User } from "@stream-io/video-react-sdk";
import { useTRPC } from "@/trpc/client";
import { useMutation } from "@tanstack/react-query";

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY!;
if (!apiKey) {
  throw new Error("NEXT_PUBLIC_STREAM_API_KEY is missing");
}
export const useStreamVideoClient = (userId: string, userName: string) => {
  const [client, setClient] = useState<StreamVideoClient | null>(null);
  const trpc = useTRPC();

  const generateTokenMutation = useMutation(
    trpc.meetings.generateToken.mutationOptions(),
  );
  useEffect(() => {
    if (!userId || !userName) {
      setClient(null);
      return;
    }

    let isActive = true;

    let streamClient: StreamVideoClient | null = null;

    const initClient = async () => {
      try {
        const token = await generateTokenMutation.mutateAsync();
        if (!isActive) return;

        const user: User = { id: userId, name: userName };

        streamClient = new StreamVideoClient({
          apiKey,
          user,
          token,
        });

        if (isActive) {
          setClient(streamClient);
        }
      } catch (err) {
        console.error("Failed to initialize Stream client", err);
      }
    };

    initClient();

    return () => {
      isActive = false;
      if (streamClient) {
        streamClient.disconnectUser();
      }
      setClient(null);
    };
  }, [userId, userName, generateTokenMutation]);

  return client;
};
