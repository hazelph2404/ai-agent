"use client";

import { MeetingForm } from "./meeting-form";
import { useRouter } from "next/navigation";
import { CommandResponsiveDialog } from "@/components/ui/command";

export default function NewMeetingDialog({
  open,
  setOpenDialog,
}: {
  open: boolean;
  setOpenDialog: (open: boolean) => void;
}) {
  const router = useRouter();
  return (

    <CommandResponsiveDialog
    open={open} 
    onOpenChange={setOpenDialog}
    title="Edit Meeting"
    description="Edit the meeting details"
  >
    <div className="px-6 pt-6 py-6 space-y-2">
        <MeetingForm
          variant="dialog"
          onSuccess={(meetingId) => {
            setOpenDialog(false);
            router.push(`/meetings/${meetingId}`);
          }}
          onCancel={() => setOpenDialog(false)}
        />
      </div>
    </CommandResponsiveDialog>
  );
}
