"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AgentForm } from "./agent-form";
import { AgentGetOne } from "../../types";
interface UpdateAgentDialog {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialValues: AgentGetOne;
}
export default function UpdateAgentDialog({
  open,
  onOpenChange,
  initialValues,
}: UpdateAgentDialog) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[640px] p-6">
        <DialogHeader>
          <DialogTitle>Edit Agent</DialogTitle>
          <DialogDescription>Edit agent details</DialogDescription>
        </DialogHeader>

        <AgentForm
          variant="dialog"
          onCancel={() => onOpenChange(false)}
          onSuccess={() => onOpenChange(false)}
          initialValues={initialValues}
        />
      </DialogContent>
    </Dialog>
  );
}
