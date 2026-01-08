import { z } from "zod";
export const meetingsInsertSchema = z.object({
  name: z.string().min(1, { message: "Title is required" }),
  agentId: z.string().min(1, { message: "Agent not found!" }),
});

export const meetingUpdateSchema = z.object({
  id: z.string().min(1, { message: "Id meeting is required" }),
});
