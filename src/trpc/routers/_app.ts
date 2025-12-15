import {createTRPCRouter} from '../init'
import { agentRouters } from '@/modules/agents/server/procedure';
export const appRouter = createTRPCRouter({
    agent: agentRouters,
}
)
export type AppRouter = typeof appRouter;
