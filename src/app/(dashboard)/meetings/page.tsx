import MeetingsView, { LoadingMeeting, MeetingViewError } from '@/modules/meetings/ui/views/meetings-view';
import { ErrorBoundary } from 'react-error-boundary';
import { Suspense } from 'react';
import { getQueryClient, trpc } from '@/trpc/server'; 
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { headers } from 'next/headers';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';

const Page = async () => {
  const requestHeaders = await headers();
  const session = await auth.api.getSession({
      headers: requestHeaders,
  });

  if (!session) {
    redirect("/sign-in");
  }

  const queryClient = getQueryClient({
    headers: requestHeaders, 
  });
  // for PREMIUM user experiences: load the data in server first instead of making user wait 
  await queryClient.prefetchQuery(trpc.meetings.getMany.queryOptions({}))
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<LoadingMeeting />}>
        <ErrorBoundary fallback={<MeetingViewError />}>
          <MeetingsView />
        </ErrorBoundary>
      </Suspense>
    </HydrationBoundary>
  );
};

export default Page;


