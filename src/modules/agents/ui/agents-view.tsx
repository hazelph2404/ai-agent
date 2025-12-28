'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import { useTRPC } from '@/trpc/client';
import { DataTable } from './components/data-table';
import {columns} from './components/columns'

const AgentsView = () => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.agent.getMany.queryOptions());
  return (
    <div className="flex-1 pb-4 px-4 md:px-8 flex flex-col gap-y-4">
        <DataTable columns={columns} data={data}/>
    </div>
  );
  
};

export default AgentsView;
