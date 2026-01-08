"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { MeetingForm } from "./meeting-form";
import { useRouter } from "next/navigation";

export default function NewMeetingDialog({
  open,
  setOpenDialog,
}: {
  open: boolean;
  setOpenDialog: (open: boolean) => void;
}) {
  const router = useRouter();
  return (
    <Dialog open={open} onOpenChange={setOpenDialog}>
      <DialogContent className="sm:max-w-[640px] p-6">
        <DialogHeader>
          <DialogTitle>New Meeting</DialogTitle>
        </DialogHeader>

        <MeetingForm
          variant="dialog"
          onSuccess={(meetingId) => {
            setOpenDialog(false);
            router.push(`/meetings/${meetingId}`);
          }}
          onCancel={() => setOpenDialog(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
