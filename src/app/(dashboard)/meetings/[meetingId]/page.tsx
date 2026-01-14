
import { auth } from '@/lib/auth';
import MeetingIdView, {MeetingIdPageViewError,LoadingMeetingIdPage } from '@/modules/meetings/ui/views/meeting-id-view';
import { getQueryClient, trpc } from '@/trpc/server';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import React, { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary';

interface Props {
    params: Promise<{meetingId: string;}>
}
const Page = async ({params}: Props) => {
    const {meetingId} = await params;     
    const requestHeaders = await headers();  
    const session = await auth.api.getSession({
        headers: requestHeaders,
    }) 
    if (!session){
        redirect("/sign-in");
    }
    const queryClient =  getQueryClient({
        headers: requestHeaders,
      });
    // *** IMPORTANT NOTE ****
    await queryClient.prefetchQuery(trpc.meetings.getOne.queryOptions({
        id: meetingId
    }))

    //TO DO: prefetch `meetings.getTranscript` 

  return (
    <div>

        <HydrationBoundary state={dehydrate(queryClient)}>
            <Suspense fallback={(<LoadingMeetingIdPage/>)}>
              <ErrorBoundary
                fallback={
                  <MeetingIdPageViewError/>}>
                      <MeetingIdView meetingId={meetingId}/>
                </ErrorBoundary>
            </Suspense>
        </HydrationBoundary>
    </div>
  )
}

export default Page