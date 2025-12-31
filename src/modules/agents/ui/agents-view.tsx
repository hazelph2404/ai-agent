'use client';

import { useQuery } from '@tanstack/react-query';
import { useTRPC } from '@/trpc/client';
import { DataTable } from './components/data-table';
import { columns } from './components/columns';
import EmptyState from '@/components/empty-state';
import { useAgentsFilter } from '../hooks/use-agents-filter';

const AgentsView = () => {
  const [filters] = useAgentsFilter();
  const trpc = useTRPC();

  const { data } = useQuery(
    trpc.agents.getMany.queryOptions({
      ...filters,
    })
  );

  if (!data) return null;

  return (
    <div className="flex-1 pb-4 px-4 md:px-8 flex flex-col gap-y-4">
      <DataTable columns={columns} data={data.items} />

      {data.items.length === 0 && (
        <EmptyState
          title="Create your first agent"
          description="Create an agent to join your meeting..."
        />
      )}
    </div>
  );
};

export default AgentsView;
