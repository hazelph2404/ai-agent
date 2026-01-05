import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { db } from "@/db";

import { and, count, desc, eq,getTableColumns, ilike, sql } from "drizzle-orm";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { MIN_PAGE_SIZE , MAX_PAGE_SIZE, DEFAULT_PAGE_SIZE} from "@/constants";

import { agents } from "@/db/schema";
import { agentsInsertSchema, agentsUpdatedSchema } from "../schemas";

export const agentRouters = createTRPCRouter({
  getOne: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      const [existingAgent] = await db
        .select({
          ...getTableColumns(agents),
          meetingCount: sql<number>`(
            SELECT count(*) 
            FROM ${agents} 
            WHERE ${agents.userId} = ${ctx.auth.user.id}
          )`.mapWith(Number),
        })
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
    //we don't need input from user
    // we only need ctx to know and filter based on the user id attached with context. 
      getMany: protectedProcedure
      .input(z.object({
        page: z.number().min(1).default(1),
        pageSize: z.number().min(MIN_PAGE_SIZE).max(MAX_PAGE_SIZE).default(DEFAULT_PAGE_SIZE),
        search: z.string().nullish(),
    }))
    // if i don't set this as optional, 
    //that means i have to handle errors inside agents-view.tsx or any other files that i will use this function.

      .query(async ({ ctx, input }) => {
        const {search, page, pageSize} = input
        const data = await db
        .select({
          ...getTableColumns(agents),
          meetingCount: sql<number>`5`,
        })      
        .from(agents)
        .where(
          and( 
            eq(agents.userId, ctx.auth.user.id), 
            search ? ilike(agents.name, `%${search}%`) : sql`true`
        ) 
        )
        .orderBy(desc(agents.createdAt), desc(agents.id))
        .limit(pageSize)
        .offset((page - 1) * pageSize)

        const [total] = await db
        .select({count: count()})
        .from(agents)
        .where(
          and( 
            eq(agents.userId, ctx.auth.user.id), 
            search ? ilike(agents.name, `%${search}%`) : sql`true`
          )
        )
        const totalPages = Math.ceil(total.count / pageSize)

        return {items:data, total:total.count, totalPages};
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

    delete: protectedProcedure
      .input(z.object({ id: z.string() }))
      .mutation(async ({ input, ctx }) => {
        const [deletedAgent] = await db
          .delete(agents)
          .where(
            and(
              eq(agents.id, input.id),
              eq(agents.userId, ctx.auth.user.id)
            )
          )
          .returning(); 
    if (!deletedAgent) {
        throw new TRPCError({ code: "NOT_FOUND" });
    }
    return deletedAgent;
  }),
  update: protectedProcedure
    .input(agentsUpdatedSchema)
    .mutation(async({input, ctx}) => {
      const {id, ...dataToUpdate} = input;
      const [updatedAgent] = await db.update(agents).set(dataToUpdate).where(and(eq(agents.id, id), eq(agents.userId, ctx.auth.user.id)))
    .returning();
    if (!updatedAgent){
      throw new TRPCError({code: "NOT_FOUND"});
    }
    return updatedAgent;
  }),
});
