"use client";
import React, { useState } from "react";
import { useTRPC } from "@/trpc/client";
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { useRouter } from "next/navigation"; // Đổi từ redirect sang useRouter
import MeetingIdViewHeader from "../components/meeting-id-view-header";
import { toast } from "sonner";
import { useConfirm } from "@/hooks/use-confirm";
import UpdateMeetingDialog from "../components/update-meeting-dialog";
import LoadingState from "@/components/loading-state";
import ErrorState from "@/components/error-state";
import UpcomingState from "../components/upcoming-state";
import EmptyState from "../components/empty-state";
import ProcessingState from "../components/process-state";
import CompletedState from "../components/completed-state";
import ActiveState from "../components/active-state";

interface Props {
  meetingId: string;
  onSuccess?: () => void;
}

const MeetingIdView = ({ meetingId, onSuccess }: Props) => {
  const trpc = useTRPC();
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data } = useSuspenseQuery(
    trpc.meetings.getOne.queryOptions({ id: meetingId }),
  );

  const isActive = data.status === "active";
  const isUpcoming = data.status === "upcoming";
  const isCancelled = data.status === "cancelled";
  const isCompleted = data.status === "completed";
  const isProcessing = data.status === "processing";

  const removeMeeting = useMutation(
    trpc.meetings.delete.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey: trpc.meetings.getMany.queryKey({}),
        });
        toast.success(`Deleted successfully ${data.name}`);
        router.push("/meetings");
        onSuccess?.();
      },
      onError: (error) => {
        toast.error(error.message);
      },
    }),
  );

  const [openMeetingDialog, setOpenMeetingDialog] = useState(false);
  const [ConfirmDialog, confirmRemove] = useConfirm(
    "Delete meeting?",
    "This action will delete the record of this meeting.",
  );

  const handleRemoveAgent = async () => {
    const ok = await confirmRemove();
    if (!ok) return;
    void removeMeeting.mutate({ id: meetingId });
  };

  const handleJoinCall = () => {
    router.push(`/call/${meetingId}`);
  };

  const handleViewSummary = () => {
    router.push(`/meetings/${meetingId}/summary`);
  };

  return (
    <>
      <ConfirmDialog />
      {openMeetingDialog && (
        <UpdateMeetingDialog
          open={openMeetingDialog}
          setOpenDialog={setOpenMeetingDialog}
          initialValues={data}
        />
      )}

      <div className="flex-1 py-4 px-4 md:px-8 flex flex-col gap-y-4">
        <MeetingIdViewHeader
          meetingName={data.name}
          meetingId={data.id}
          onEdit={() => setOpenMeetingDialog(true)}
          onRemove={handleRemoveAgent}
        />

        {isCancelled && <EmptyState />}

        {isActive && <ActiveState onJoin={handleJoinCall} />}

        {isUpcoming && <UpcomingState onStart={handleJoinCall} />}

        {isCompleted && <CompletedState onViewSummary={handleViewSummary} />}

        {isProcessing && <ProcessingState />}
      </div>
    </>
  );
};

export default MeetingIdView;

export const LoadingMeetingIdPage = () => (
  <LoadingState
    title="Loading meeting"
    description="This may take a few seconds"
  />
);

export const MeetingIdPageViewError = () => (
  <ErrorState
    title="Error loading meeting"
    description="Something went wrong."
  />
);
