import React from 'react';
import { Video, Radio } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ActiveStateProps {
  onJoin?: () => void;
}

const ActiveState = ({ onJoin }: ActiveStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 border border-zinc-200 rounded-xl bg-zinc-50/50 gap-y-4 text-center h-[400px]">
      <div className="relative">
        {/* Soft Muted Green Icon */}
        <div className="p-4 rounded-full bg-emerald-50 text-emerald-600/80">
          <Video className="size-8" />
        </div>
        
        {/* FIXED: Pulse indicator now matches the Green/Emerald theme */}
        <span className="absolute top-0 right-0 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400/40 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500/60"></span>
        </span>
      </div>

      <div className="space-y-1">
        <h3 className="text-lg font-medium text-zinc-900">Meeting is Live</h3>
        <p className="text-sm text-zinc-500 max-w-[300px]">
          The session is currently in progress. Join now to participate and see the live transcript.
        </p>
      </div>

      {/* Muted Blue Button - matches your "New Meeting" button style */}
      <Button 
        onClick={onJoin}
        size="lg" 
        className="mt-4 bg-[#5c7c8a] hover:bg-[#4a6571] text-white font-medium shadow-sm transition-all active:scale-95"
      >
        <Radio className="mr-2 size-4" />
        Join Meeting
      </Button>
    </div>
  );
};

export default ActiveState;