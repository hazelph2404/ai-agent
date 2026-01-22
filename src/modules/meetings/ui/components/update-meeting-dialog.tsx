"use client";

import { MeetingForm } from "./meeting-form";
import { MeetingGetOne } from "../../types";
import { CommandResponsiveDialog } from "@/components/ui/command";

interface Props {
  open: boolean;
  setOpenDialog: (open: boolean) => void;
  initialValues: MeetingGetOne;
}

export default function UpdateMeetingDialog({
  open,
  setOpenDialog,
  initialValues,
}: Props) {
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
          initialValues={initialValues}
          onSuccess={() => {
            setOpenDialog(false);
          }}
          onCancel={() => setOpenDialog(false)}
        />
      </div>
    </CommandResponsiveDialog>
  );
}
