import { z } from "zod";
export const MEETING_STATUSES = [
  "upcoming",
  "active",
  "completed",
  "processing",
  "cancelled",
] as const;

export type MeetingStatus = (typeof MEETING_STATUSES)[number];

export const meetingsInsertSchema = z.object({
  name: z.string().min(1, { message: "Title is required" }),
  agentId: z.string().min(1, { message: "Agent not found!" }),
});

export const meetingUpdateSchema = z.object({
  id: z.string().min(1, { message: "Id meeting is required" }),
});
