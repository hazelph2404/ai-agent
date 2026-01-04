'use client';

import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import LoadingState from "@/components/loading-state";
import ErrorState from "@/components/error-state";
import AgentIdViewHeader from "../components/agent-id-view-header";
import GeneratedAvatar from "@/components/generated-avatar";
import { Badge } from "@/components/ui/badge";
import { VideoIcon } from "lucide-react";

interface Props {
  agentId: string;
}

const AgentIdView = ({ agentId }: Props) => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(
    trpc.agents.getOne.queryOptions({ id: agentId })
  );

  return (
    <div className="flex-1 px-4 py-6 md:px-8 max-w-5xl">
      {/* Header */}
      <AgentIdViewHeader
        agentId={agentId}
        agentName={data.name}
        onEdit={() => {}}
        onRemove={() => {}}
      />

      {/* Main card */}
      <div className="mt-6 rounded-xl border bg-background p-6 shadow-sm">
        {/* Identity */}
        <div className="flex items-center gap-x-4">
          <GeneratedAvatar
            seed={data.name || "Agent"}
            shape="circle"
            className="size-16 border"
          />

          <div className="flex flex-col gap-y-1">
            <h2 className="text-2xl font-semibold leading-tight">
              {data.name}
            </h2>
            <p className="text-sm text-muted-foreground">
              AI meeting agent
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-6 flex flex-wrap gap-3">
          <Badge
            variant="outline"
            className="flex items-center gap-x-2 px-3 py-1.5 text-sm"
          >
            <VideoIcon className="size-4 text-blue-700" />
            {data.meetingCount}{" "}
            {data.meetingCount === 1 ? "meeting" : "meetings"}
          </Badge>
        </div>

        {/* Divider */}
        <div className="my-6 h-px w-full bg-border" />

        {/* Details / future content */}
        <div className="flex flex-col gap-y-2">
          <h4 className="text-sm font-medium text-muted-foreground">
            Description
          </h4>
          <p className="text-sm text-muted-foreground">
            This agent will follow your instructions and participate in meetings
            on your behalf. You can configure its behavior, responses, and
            integrations.
          </p>
        </div>
      </div>
    </div>
  );
};

/* States */

const AgentLoadingState = () => (
  <LoadingState
    title="Loading agent"
    description="This may take a few seconds..."
  />
);

const AgentErrorState = () => (
  <ErrorState
    title="Error"
    description="Agent does not exist or you don’t have access."
  />
);

export { AgentIdView, AgentLoadingState, AgentErrorState };
