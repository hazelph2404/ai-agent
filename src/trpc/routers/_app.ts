
import {createTRPCRouter} from '../init'
import { agentRouters } from '@/modules/agents/server/procedure';
//include all the routes that clients can call.
export const appRouter = createTRPCRouter({
    agents: agentRouters,
}
)
export type AppRouter = typeof appRouter;
