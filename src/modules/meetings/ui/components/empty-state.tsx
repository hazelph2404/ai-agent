import React from 'react';
import { Ban, ArrowLeft, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

const EmptyState = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center p-8 border border-zinc-200 rounded-xl bg-zinc-50/50 gap-y-4 text-center h-[400px]">
      <div className="relative">
        {/* Muted Rose/Red Icon Background */}
        <div className="p-4 rounded-full bg-[#fdf2f2] text-[#9f5d5d]">
          <Ban className="size-8" />
        </div>
      </div>

      <div className="space-y-1">
        {/* Muted Red Heading */}
        <h3 className="text-lg font-medium text-[#9f5d5d]">Meeting Cancelled</h3>
        <p className="text-sm text-zinc-500 max-w-[300px]">
          This session is no longer active. You can return to your dashboard or start a fresh meeting.
        </p>
      </div>

      <div className="flex gap-x-3 mt-4">
        <Button 
          variant="outline" 
          onClick={() => router.push('/meetings')}
          className="text-zinc-600 border-zinc-300 hover:bg-zinc-100 font-medium transition-colors"
        >
          <ArrowLeft className="mr-2 size-4" />
          Go Back
        </Button>
        {/* Matches your "New Meeting" button style exactly */}
        <Button 
          className="bg-zinc-900 hover:bg-zinc-800 text-white font-medium shadow-sm transition-all"
          onClick={() => { /* Your create logic */ }}
        >
          <Plus className="mr-2 size-4" />
          New Meeting
        </Button>
      </div>
    </div>
  );
};

export default EmptyState;