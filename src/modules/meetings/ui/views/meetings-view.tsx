"use client";

import ErrorState from "@/components/error-state";
import LoadingState from "@/components/loading-state";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { DataTable } from "./components/data-table";
import React from "react";
import { columns } from "./components/columns";
import { useRouter } from "next/navigation";
import EmptyState from "@/components/empty-state";
import { DataPagination } from "./components/data-pagination";
import { useMeetingsFilter } from "../../hooks/use-meetings-filter";
const MeetingView = () => {
  const trpc = useTRPC();
  const router = useRouter();
  const [filters, setFilters] = useMeetingsFilter();
    const { data } = useSuspenseQuery(
        trpc.meetings.getMany.queryOptions({
          page: filters.page,
          search: filters.search,
        })
  );
  if (!data) return null;
  const hasData = data.items.length > 0;
  
  return (
    <div className="px-6 py-3 justify-center">
      <DataTable
        columns={columns}
        data={data.items}
        onRowClick={(row) => router.push(`/meetings/${row.id}`)}/>

      {!hasData ? (
        <EmptyState
          title="Create your first meeting"
          description="Create a meeting with your favorite agent..."
        />
      ) : (
        <DataPagination
          page={filters.page}
          totalPages={data.totalPages}
          onPageChange={(page) => setFilters({ page })}
        />
      )}
    </div>
  );
};

export default MeetingView;

export const LoadingMeeting = () => { return ( <LoadingState title="Loading meetings" description="This may take a few seconds" /> ); }; 
export const MeetingViewError = () => { return ( <ErrorState title="Error loading meetings" description="Something went wrong." /> ); };