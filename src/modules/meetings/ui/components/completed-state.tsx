import React from "react";
import { CheckCircle2, FileText, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CompletedStateProps {
  onViewSummary?: () => void;
  onViewTranscript?: () => void;
}

const CompletedState = ({
  onViewSummary,
  onViewTranscript,
}: CompletedStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 border border-zinc-200 rounded-xl bg-zinc-50/50 gap-y-4 text-center h-[400px]">
      <div className="relative">
        <div className="p-4 rounded-full bg-[#e0e7ff] text-[#6366f1]">
          <CheckCircle2 className="size-8" />
        </div>
      </div>

      <div className="space-y-1">
        <h3 className="text-lg font-medium text-zinc-900">Meeting Completed</h3>
        <p className="text-sm text-zinc-500 max-w-[300px]">
          The session has finished. Your AI-generated summary and full
          transcript are now ready for review.
        </p>
      </div>

      <div className="flex gap-x-3 mt-4">
        <Button
          onClick={onViewTranscript}
          variant="outline"
          variant="outline"
          className="text-zinc-600 border-zinc-300 hover:bg-zinc-100 font-medium transition-colors"
        >
          <FileText className="mr-2 size-4" />
          Transcript
        </Button>
        <Button
          onClick={onViewSummary}
          className="bg-[#818cf8] hover:bg-[#6366f1] text-white font-medium shadow-sm transition-all"
        >
          View Summary
          <ArrowRight className="ml-2 size-4" />
        </Button>
      </div>
    </div>
  );
};

export default CompletedState;
