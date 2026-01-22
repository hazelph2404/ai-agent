"use client";

import { useEffect, useState } from "react";
import { StreamVideoClient, User } from "@stream-io/video-react-sdk";
import { useTRPC } from "@/trpc/client";
import { useMutation } from "@tanstack/react-query";

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY!;

export const useStreamVideoClient = (userId: string, userName: string) => {
  const [client, setClient] = useState<StreamVideoClient | null>(null);
  const trpc = useTRPC();

  const generateTokenMutation = useMutation(
    trpc.meetings.generateToken.mutationOptions(),
  );

  useEffect(() => {
    if (!userId || !userName) return;

    let streamClient: StreamVideoClient | null = null;

    const initClient = async () => {
      try {
        const token = await generateTokenMutation.mutateAsync();
        const user: User = { id: userId, name: userName };

        streamClient = new StreamVideoClient({
          apiKey,
          user,
          token,
        });

        setClient(streamClient);
      } catch (err) {
        console.error("Failed to initialize Stream client", err);
      }
    };

    initClient();

    return () => {
      streamClient?.disconnectUser();
    };
  }, [userId, userName]);

  return client;
};
