"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AgentForm } from "./agent-form";

export default function NewAgentDialog({
  open,
  setOpenDialog,
}: {
  open: boolean;
  setOpenDialog: (open: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={setOpenDialog}>
      <DialogContent className="sm:max-w-[640px] p-6">
        <DialogHeader>
          <DialogTitle>New Agent</DialogTitle>
          <DialogDescription>Create a new agent</DialogDescription>
        </DialogHeader>

        <AgentForm
          variant="dialog"
          onCancel={() => setOpenDialog(false)}
          onSuccess={() => setOpenDialog(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
