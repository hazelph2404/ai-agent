'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import { useTRPC } from '@/trpc/client';

const AgentsView = () => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.agent.getMany.queryOptions());

  return <div>
    {JSON.stringify(data, null, 2)}
  </div> 
};

export default AgentsView;
