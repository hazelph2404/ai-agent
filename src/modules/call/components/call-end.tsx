"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

const CallEnded = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full bg-radial from-sidebar-accent to-sidebar">
      <div className="py-4 px-8 flex flex-col items-center justify-center gap-y-6 bg-background rounded-lg p-10 shadow-sm border">
        <div className="flex flex-col gap-y-2 text-center">
          <h1 className="text-2xl font-bold">Call Ended</h1>
          <p className="text-sm text-muted-foreground">
            You have left the meeting
          </p>
        </div>

        <div className="flex items-center gap-x-3 w-full">
            <Button
              variant="outline"
              asChild
              className="flex-1"
            >
              <Link href="/meetings"> 
                Go Home 
              </Link>
            </Button>
        </div>
      </div>
    </div>
  );
};
export default CallEnded;