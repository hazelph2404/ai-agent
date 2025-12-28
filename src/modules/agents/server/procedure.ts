import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { db } from "@/db";
import { agents } from "@/db/schema";
import { agentsInsertSchema } from "../schemas";
import { and, eq } from "drizzle-orm";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

export const agentRouters = createTRPCRouter({
  getOne: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      const [existingAgent] = await db
        .select()
        .from(agents)
        .where(
          and(
            eq(agents.id, input.id),
            eq(agents.userId, ctx.auth.user.id)
          )
        );

      if (!existingAgent) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }

      return existingAgent;
    }),

  getMany: protectedProcedure.query(async ({ ctx }) => {
    const data = await db
      .select()
      .from(agents)
      .where(eq(agents.userId, ctx.auth.user.id));

    return data;
  }),

  create: protectedProcedure
    .input(agentsInsertSchema)
    .mutation(async ({ input, ctx }) => {
      const [createdAgent] = await db
        .insert(agents)
        .values({
          ...input,
          userId: ctx.auth.user.id,
        })
        .returning();

      return createdAgent;
    }),
});
