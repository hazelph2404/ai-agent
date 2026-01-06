
import { meetingsRouter } from '@/modules/meetings/server/procedures';
import {createTRPCRouter} from '../init'
import { agentRouters } from '@/modules/agents/server/procedures';
//include all the routes that clients can call.
export const appRouter = createTRPCRouter({
    agents: agentRouters,
    meetings: meetingsRouter
}
)
export type AppRouter = typeof appRouter;
