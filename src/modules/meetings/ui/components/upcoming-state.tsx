import React from 'react';
import { Play, Calendar } from 'lucide-react'; // Assuming you're using Lucide for icons
import { Button } from '@/components/ui/button'; // Standard Shadcn UI button

interface UpcomingStateProps {
  onStart?: () => void;
}

const UpcomingState = ({ onStart }: UpcomingStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-xl bg-muted/30 gap-y-4 text-center h-[400px]">
      <div className="p-4 rounded-full bg-blue-50 text-blue-600/80">
        <Calendar className="size-10" />
      </div>
      <div className="space-y-1">
        <h3 className="text-xl font-semibold">Upcoming Meeting</h3>
        <p className="text-sm text-muted-foreground max-w-[300px]">
          This meeting hasn&apos;t started yet. Once it begins, you&apos;ll be able to join the call and interact with the AI agent.
        </p>
      </div>
      <Button 
        onClick={onStart}
        size="lg" 
        className="mt-2 font-semibold shadow-md transition-transform hover:scale-105"
      >
        <Play className="mr-2 size-4 fill-current" />
        Start Meeting
      </Button>
    </div>
  );
};

export default UpcomingState;