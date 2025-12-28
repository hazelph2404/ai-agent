import { auth } from '@/lib/auth';
import {initTRPC} from '@trpc/server';
import { headers } from 'next/headers';

const t = initTRPC.create({
    
})

export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;
export const baseProcedure = t.procedure; 
export const protectedProcedure = baseProcedure.use(async({ctx, next}) => {
    const session = await auth.api.getSession({
        headers: await headers(),
    })
})