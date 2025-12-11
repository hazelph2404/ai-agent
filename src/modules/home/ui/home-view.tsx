"use client";
import React from "react";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";


const HomeView = () => {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  if (!session) {
    return <div> Loading... </div>;
  }
  return (
    <div className="flex flex-col p-4 gap-y-4">
      Logged in as {session.user.name}
      <Button
        onClick={() =>
          authClient.signOut({
            fetchOptions: {
              onSuccess: () => {
                router.push("/auth/sign-in");
              },
            },
          })
        }
      >
        Sign Out
      </Button>
    </div>
  );
};

export default HomeView;
