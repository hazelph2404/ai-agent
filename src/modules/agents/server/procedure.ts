import {createTRPCRouter, protectedProcedure} from '@/trpc/init'
import { db } from '@/db';
import {eq} from 'drizzle-orm';
import { agents } from '@/db/schema';
import { agentsInsertSchema } from '../schemas';
import z from 'zod';

export const agentRouters = createTRPCRouter({
    //instead of using base procedure, we use protected procedure!! 
    //when user does not sign in, they cannot see the dashboard! 
    getOne: protectedProcedure.input(z.object({ id: z.string() })).query(async ({input}) => {
        const [existingAgent] = await db.select().from(agents).where(eq(agents.id, input.id))
        return existingAgent;
    }),
    //instead of using base procedure, we use protected procedure!! 
    //when user does not sign in, they cannot see the dashboard! 
    getMany: protectedProcedure.query(async ()=> {
        const data = await db.select().from(agents);
        return data;
    }), 
    create: protectedProcedure.input(agentsInsertSchema).mutation(async ({input, ctx}) => {
        const [createdAgent] = await db.insert(agents).values({...input, userId: ctx.auth.user.id}).returning();
        return createdAgent;
    }),
    
})
