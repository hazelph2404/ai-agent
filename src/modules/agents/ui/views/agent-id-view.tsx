"use client";
import { useState } from "react";
import { useTRPC } from "@/trpc/client";
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import LoadingState from "@/components/loading-state";
import ErrorState from "@/components/error-state";
import AgentIdViewHeader from "../components/agent-id-view-header";
import GeneratedAvatar from "@/components/generated-avatar";
import { Badge } from "@/components/ui/badge";
import { VideoIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useConfirm } from "@/hooks/use-confirm";
import UpdateAgentDialog from "../components/update-agent-dialog";

interface Props {
  agentId: string;
  onSuccess?: () => void;
}

const AgentIdView = ({ agentId, onSuccess }: Props) => {
  const trpc = useTRPC();
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data } = useSuspenseQuery(
    trpc.agents.getOne.queryOptions({ id: agentId }),
  );
  const [updateAgentDialogOpen, setUpdateAgentDialogOpen] = useState(false);

  const removeAgent = useMutation(
    trpc.agents.delete.mutationOptions({
      onSuccess: async (data) => {
        //Any cached result for agents.getMany({}) should no longer be trusted.
        await queryClient.invalidateQueries(
          trpc.agents.getMany.queryOptions({}),
        );
        toast.success(`Deleted successfully ${data.name}`);
        router.push("/agents");

        onSuccess?.();
      },
      onError: (error) => {
        toast.error(error.message);
      },
    }),
  );

  const [RemoveConfirmation, confirmRemove] = useConfirm(
    "Delete Agent?",
    data.meetingCount > 0
      ? `This agent has participated in ${data.meetingCount} meetings. Deleting it will remove all associated data.`
      : "This agent hasn't participated in any meetings yet. Are you sure you want to delete it?",
  );
  const handleRemoveAgent = async () => {
    const ok = await confirmRemove();
    if (!ok) {
      return;
    }
    await removeAgent.mutate({ id: agentId });
  };
  return (
    <>
      <RemoveConfirmation />
      <UpdateAgentDialog
        open={updateAgentDialogOpen}
        onOpenChange={setUpdateAgentDialogOpen}
        initialValues={data}
      />

      <div className="mx-auto w-full max-w-5xl px-4 py-8 md:px-8">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <GeneratedAvatar
              seed={data.name || "Agent"}
              shape="circle"
              className="size-16 border"
            />

            <div className="flex flex-col gap-1">
              <h1 className="text-2xl font-semibold leading-tight">
                {data.name}
              </h1>
              <p className="text-sm text-muted-foreground">AI meeting agent</p>
            </div>
          </div>

          <AgentIdViewHeader
            agentId={agentId}
            agentName={data.name}
            onEdit={() => setUpdateAgentDialogOpen(true)}
            onRemove={handleRemoveAgent}
          />
        </div>

        {/* Main card */}
        <div className="mt-8 rounded-xl border bg-background shadow-sm">
          {/* Stats */}
          <div className="flex flex-wrap gap-3 border-b px-6 py-4">
            <Badge
              variant="outline"
              className="flex items-center gap-2 px-3 py-1.5 text-sm"
            >
              <VideoIcon className="size-4 text-blue-700" />
              {data.meetingCount}{" "}
              {data.meetingCount === 1 ? "meeting" : "meetings"}
            </Badge>
          </div>

          {/* Content */}
          <div className="px-6 py-6 space-y-3">
            <h4 className="text-sm font-medium text-muted-foreground">
              Instructions
            </h4>
            <p className="text-sm leading-relaxed text-foreground">
              {data.instructions}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
/* States */

const AgentLoadingState = () => (
  <div className="min-h-screen flex items-center justify-center">
  <LoadingState
    title="Loading agent"
    description="This may take a few seconds..."
  />
  </div>
);

const AgentErrorState = () => (
  <div className="min-h-screen flex items-center justify-center">
  <ErrorState
    title="Error"
    description="Agent does not exist or you don’t have access."
  />
  </div>
);

export { AgentIdView, AgentLoadingState, AgentErrorState };
