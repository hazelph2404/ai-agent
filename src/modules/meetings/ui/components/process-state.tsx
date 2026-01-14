import React from 'react'
import { Loader2, Sparkles } from 'lucide-react'

const ProcessingState = () => {
  return (
    <div className="flex flex-col items-center justify-center p-8 border border-zinc-200 rounded-xl bg-zinc-50/50 gap-y-6 text-center h-[400px]">
      <div className="relative">
        {/* Muted Spinner */}
        <Loader2 className="size-10 text-zinc-400 animate-spin" />
        {/* Subtle AI indicator */}
        <Sparkles className="size-4 text-zinc-300 absolute -top-1 -right-1 animate-pulse" />
      </div>

      <div className="space-y-1">
        <h3 className="text-lg font-medium text-zinc-900">AI is hard at work...</h3>
        <p className="text-sm text-zinc-500 max-w-[400px]">
          We&apos;re currently transcribing your meeting and generating an intelligent summary. 
          This usually takes less than a minute.
        </p>
      </div>

      {/* Muted progress indicator */}
      <div className="flex items-center gap-x-2 text-[11px] font-medium text-zinc-500 bg-zinc-100 px-3 py-1 rounded-full border border-zinc-200">
        <span className="relative flex h-1.5 w-1.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-zinc-300 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-zinc-400"></span>
        </span>
        Analyzing sentiments & key takeaways
      </div>
    </div>
  )
}

export default ProcessingState