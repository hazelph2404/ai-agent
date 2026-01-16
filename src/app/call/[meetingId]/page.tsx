import React, { Suspense } from 'react'
import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { headers } from 'next/headers'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { getQueryClient, trpc } from '@/trpc/server'
import { ErrorBoundary } from 'react-error-boundary'
import CallView from '@/modules/call/ui/call-view'


interface Props {
    params: Promise<{ meetingId: string }>
}

const Page = async ({ params }: Props) => {
    const reqHeaders = await headers()

    const session = await auth.api.getSession({
        headers: reqHeaders
    })


    if (!session) {
        redirect("/sign-in")
    }

    const { meetingId } = await params;
    const queryClient = getQueryClient({
        headers: reqHeaders,
    })
    void queryClient.prefetchQuery(
        trpc.meetings.getOne.queryOptions({id: meetingId})
    )
    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <Suspense fallback={(<div> To do: loading </div>)}>
                <ErrorBoundary fallback={(<div> To do: error</div>)}>
                    <CallView meetingId={meetingId}/>
                </ErrorBoundary>
            </Suspense>
        </HydrationBoundary>
    )
}

export default Page