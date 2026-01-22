import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { db } from "@/db";
import { meetings, agents } from "@/db/schema";
import { and, count, eq, getTableColumns, ilike, sql } from "drizzle-orm";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { streamVideo } from "@/lib/stream-video";
import { MIN_PAGE_SIZE, MAX_PAGE_SIZE, DEFAULT_PAGE_SIZE } from "@/constants";
import { meetingsInsertSchema, meetingsUpdateSchema } from "../schemas";
import { generateAvatarUri } from "@/lib/avatar";
export const meetingsRouter = createTRPCRouter({
  generateToken: protectedProcedure.mutation(async ({ ctx }) => {
    await streamVideo.upsertUsers([
      {
        id: ctx.auth.user.id,
        name: ctx.auth.user.name || ctx.auth.user.email,
        role: "admin",
        image:
          ctx.auth.user.image ??
          generateAvatarUri({
            seed: ctx.auth.user.name || ctx.auth.user.email,
            variant: "initials",
          }),
      },
    ]);
    const expirationTime = Math.floor(Date.now() / 1000) + 3600;
    const issuedAt = Math.floor(Date.now() / 1000) - 60;
    const token = streamVideo.generateUserToken({
      user_id: ctx.auth.user.id,
      exp: expirationTime,
      validity_in_seconds: issuedAt,
    });

    return token;
  }),
  // ======================
  // Get ONE meeting
  // ======================
  getOne: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      const [meeting] = await db
        .select({
          ...getTableColumns(meetings),
          duration: sql<
            number | null
          >`EXTRACT(EPOCH FROM (ended_at - started_at))`.as("duration"),
        })
        .from(meetings)
        .innerJoin(agents, eq(meetings.agentId, agents.id))
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
          ...getTableColumns(meetings),
          agent: agents,
          duration: sql<
            number | null
          >`EXTRACT(EPOCH FROM (ended_at - started_at))`.as("duration"),
        })
        .from(meetings)
        .innerJoin(agents, eq(meetings.agentId, agents.id))
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
      const call = streamVideo.video.call("default", meeting.id);
      await call.create({
        data: {
          created_by_id: ctx.auth.user.id,
          custom: {
            meetingId: meeting.id,
            meetingName: meeting.name,
          },
          settings_override: {
            transcription: {
              language: "en",
              mode: "auto-on",
              closed_caption_mode: "auto-on",
            },
            recording: {
              mode: "auto-on",
              quality: "1080p",
            },
          },
        },
      });
      const [existingAgent] = await db
        .select()
        .from(agents)
        .where(eq(agents.id, meeting.agentId));

      if (!existingAgent) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Agent not found or does not belong to you",
        });
      }

      await streamVideo.upsertUsers([
        {
          id: ctx.auth.user.id,
          name: ctx.auth.user.name || ctx.auth.user.email,
          image:
            ctx.auth.user.image ||
            generateAvatarUri({
              seed: ctx.auth.user.name || ctx.auth.user.email,
              variant: "initials",
            }),
          role: "user",
        },
        {
          id: existingAgent.id,
          name: existingAgent.name,
          image: generateAvatarUri({
            seed: existingAgent.name,
            variant: "botttsNeutral",
          }),
          role: "user",
        },
      ]);
      return meeting;
    }),
  // ======================
  // Update meeting
  // ======================
  update: protectedProcedure
    .input(meetingsUpdateSchema)
    .mutation(async ({ ctx, input }) => {
      const { id, ...updateData } = input;

      // Guard: no fields to update
      if (Object.keys(updateData).length === 0) {
        const [existing] = await db
          .select()
          .from(meetings)
          .where(
            and(eq(meetings.id, id), eq(meetings.userId, ctx.auth.user.id)),
          );

        if (!existing) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Meeting not found!",
          });
        }

        return existing;
      }

      const [updated] = await db
        .update(meetings)
        .set(updateData)
        .where(and(eq(meetings.id, id), eq(meetings.userId, ctx.auth.user.id)))
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
