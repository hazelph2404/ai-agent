"use client";

import { useEffect, useState } from "react";
import { StreamVideoClient, User } from "@stream-io/video-react-sdk";
import { useTRPC } from "@/trpc/client";

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY!;

export const useStreamVideoClient = (userId: string, userName: string) => {
  const [client, setClient] = useState<StreamVideoClient | null>(null);
  const trpc = useTRPC();

  const { mutateAsync: generateToken } = trpc.meetings.generateToken.useMutation();

  useEffect(() => {
    if (!userId) return;

    const initClient = async () => {
      const token = await generateToken({}); // Lấy token từ backend
      
      const user: User = { id: userId, name: userName };
      
      const newClient = new StreamVideoClient({ apiKey, user, token });
      setClient(newClient);
    };

    initClient();

    return () => {
      if (client) {
        client.disconnectUser();
        setClient(null);
      }
    };
  }, [userId, generateToken]);

  return client;
};