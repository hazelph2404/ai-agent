

import { getQueryClient, trpc } from "@/trpc/server";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary"
import { Suspense } from "react";
import {AgentIdView, AgentErrorState, AgentLoadingState} from "@/modules/agents/ui/views/agent-id-view";
interface Props{
    params: Promise<{agentId: string}>
};

const Page = async ({params}:Props) => {
    const {agentId} = await params;
    const queryClient = getQueryClient(); 
    //still don't understand this function
    void queryClient.prefetchQuery(
        trpc.agents.getOne.queryOptions({id: agentId})
    )
    return(
        <HydrationBoundary state={dehydrate(queryClient)}>
            <Suspense fallback={<AgentLoadingState/> }>
                <ErrorBoundary fallback={<AgentErrorState/>}>
                    <AgentIdView agentId={agentId}/>
                </ErrorBoundary>
            </Suspense> 
        </HydrationBoundary>
    )
}
export default Page;