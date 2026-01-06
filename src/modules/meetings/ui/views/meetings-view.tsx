"use client"

import ErrorState from '@/components/error-state';
import LoadingState from '@/components/loading-state';
import { useTRPC } from '@/trpc/client';
import { useSuspenseQuery } from '@tanstack/react-query';
import React from 'react';

const MeetingView = () => {
  const trpc = useTRPC();
  const {data} = useSuspenseQuery(trpc.meetings.getMany.queryOptions({}))
  return (
    <div>

      {JSON.stringify(data?.items)}

    </div>
  )
}

export default MeetingView

export const LoadingMeeting = () => {
  return(
    <LoadingState title="Loading meetings" description="This may take a few seconds"/>
  )
}

export const MeetingViewError = () => {
  return(
    <ErrorState title="Error loading meetings" description="Something went wrong."/>
  )
}