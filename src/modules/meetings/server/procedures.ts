import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { db } from "@/db";
import { meetings, agents } from "@/db/schema";
import { and, count, eq, ilike, sql } from "drizzle-orm";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { MIN_PAGE_SIZE, MAX_PAGE_SIZE, DEFAULT_PAGE_SIZE } from "@/constants";
import { meetingsInsertSchema, meetingUpdateSchema } from "../schemas";
export const meetingsRouter = createTRPCRouter({
  // ======================
  // Get ONE meeting
  // ======================
  getOne: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      const [meeting] = await db
        .select({
          id: meetings.id,
          name: meetings.name,
          userId: meetings.userId,
          agentId: meetings.agentId,
          status: meetings.status,
          startedAt: meetings.startedAt,
          endedAt: meetings.endedAt,
          transcriptUrl: meetings.transcriptUrl,
          recordingUrl: meetings.recordingUrl,
          summary: meetings.summary,
          agentName: agents.name,
        })
        .from(meetings)
        .leftJoin(agents, eq(meetings.agentId, agents.id))
        .where(
          and(eq(meetings.id, input.id), eq(meetings.userId, ctx.auth.user.id)),
        );

      if (!meeting) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Meeting not found!",
        });
      }

      return meeting;
    }),

  // ======================
  // Get MANY meetings (paginated)
  // ======================
  getMany: protectedProcedure
    .input(
      z.object({
        page: z.number().min(1).default(1),
        pageSize: z
          .number()
          .min(MIN_PAGE_SIZE)
          .max(MAX_PAGE_SIZE)
          .default(DEFAULT_PAGE_SIZE),
        search: z.string().nullish(),
        agentId: z.string().nullish(),
        status: z
          .enum(["upcoming", "active", "completed", "processing", "cancelled"])
          .nullish(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { page, pageSize, search, agentId, status } = input;

      const whereClause = and(
        eq(meetings.userId, ctx.auth.user.id),
        search ? ilike(meetings.name, `%${search}%`) : sql`true`,
        agentId ? eq(meetings.agentId, agentId) : sql`true`,
        status ? eq(meetings.status, status) : sql`true`,
      );

      const items = await db
        .select({
          id: meetings.id,
          name: meetings.name,
          userId: meetings.userId,
          agentId: meetings.agentId,
          status: meetings.status,
          startedAt: meetings.startedAt,
          endedAt: meetings.endedAt,
          transcriptUrl: meetings.transcriptUrl,
          recordingUrl: meetings.recordingUrl,
          summary: meetings.summary,
          agentName: agents.name,
        })
        .from(meetings)
        .leftJoin(agents, eq(meetings.agentId, agents.id))
        .where(whereClause)
        .orderBy(sql`${meetings.startedAt} DESC NULLS LAST`)
        .limit(pageSize)
        .offset((page - 1) * pageSize);

      const [total] = await db
        .select({ count: count() })
        .from(meetings)
        .where(whereClause);

      return {
        items,
        total: total.count,
        totalPages: Math.ceil(total.count / pageSize),
      };
    }),

  // ======================
  // Create meeting
  // ======================
  create: protectedProcedure
    .input(meetingsInsertSchema)
    .mutation(async ({ ctx, input }) => {
      // Verify the agent exists and belongs to the current user
      const [agent] = await db
        .select({ id: agents.id })
        .from(agents)
        .where(
          and(
            eq(agents.id, input.agentId),
            eq(agents.userId, ctx.auth.user.id),
          ),
        );
      if (!agent) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Agent not found or does not belong to you",
        });
      }
      const [meeting] = await db
        .insert(meetings)
        .values({
          name: input.name,
          agentId: input.agentId,
          userId: ctx.auth.user.id,
          status: "upcoming",
        })
        .returning();
      return meeting;
    }),
  // ======================
  // Update meeting
  // ======================
  update: protectedProcedure
    .input(meetingUpdateSchema)
    .mutation(async ({ ctx, input }) => {
      const [updated] = await db
        .update(meetings)
        .set(input)
        .where(
          and(eq(meetings.id, input.id), eq(meetings.userId, ctx.auth.user.id)),
        )
        .returning();
      if (!updated) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Meeting not found!",
        });
      }

      return updated;
    }),

  // ======================
  // Delete meeting
  // ======================
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const [deleted] = await db
        .delete(meetings)
        .where(
          and(eq(meetings.id, input.id), eq(meetings.userId, ctx.auth.user.id)),
        )
        .returning();

      if (!deleted) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Meeting not found!",
        });
      }

      return deleted;
    }),
});
