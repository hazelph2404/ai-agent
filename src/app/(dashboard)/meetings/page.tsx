import MeetingsView, {
  LoadingMeeting,
  MeetingViewError,
} from "@/modules/meetings/ui/views/meetings-view";
import { ErrorBoundary } from "react-error-boundary";
import { Suspense } from "react";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import MeetingsListHeader from "@/modules/meetings/ui/components/meetings-list-header";
import { loadSearchParams } from "@/modules/meetings/params";
import { SearchParams } from "nuqs";
interface Props {
  searchParams: Promise<SearchParams>;
}
const Page = async ({ searchParams }: Props) => {
  const filters = await loadSearchParams(searchParams);
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
  await queryClient.prefetchQuery(
    trpc.meetings.getMany.queryOptions({ ...filters }),
  );
  return (
    <>
      <MeetingsListHeader />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<LoadingMeeting />}>
          <ErrorBoundary fallback={<MeetingViewError />}>
            <MeetingsView />
          </ErrorBoundary>
        </Suspense>
      </HydrationBoundary>
    </>
  );
};

export default Page;
