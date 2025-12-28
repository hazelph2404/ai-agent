import ErrorState from '@/components/error-state';
import { ErrorBoundary } from 'react-error-boundary';
import LoadingState from '@/components/loading-state';
import AgentsView from '@/modules/agents/ui/agents-view'
import { getQueryClient, trpc } from '@/trpc/server'
import {dehydrate, HydrationBoundary} from '@tanstack/react-query';
import { Suspense } from 'react';
import AgentsListHeader from '@/modules/agents/ui/components/agents-list-header';
import { headers } from 'next/headers';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
const Page = async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
      })
      if (!session){
        redirect("/sign-in")
      }
    const queryClient = getQueryClient();
    await queryClient.prefetchQuery(trpc.agent.getMany.queryOptions()); //SSR
    return (
        <div>
            <AgentsListHeader/>
            <HydrationBoundary state={dehydrate(queryClient)}>
                <Suspense fallback={<LoadingState title="Loading Agents" description="This may take a few seconds"/>}>
                    <ErrorBoundary fallback={<ErrorState title="Error" description="Cannot load agent"/>}>
                    <AgentsView/>
                    </ErrorBoundary>
                </Suspense>
            </HydrationBoundary>
        </div>  
    )
}
export default Page