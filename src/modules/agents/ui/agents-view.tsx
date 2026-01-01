'use client';

import { useQuery } from '@tanstack/react-query';
import { useTRPC } from '@/trpc/client';
import { DataTable } from './components/data-table';
import { columns } from './components/columns';
import EmptyState from '@/components/empty-state';
import { useAgentsFilter } from '../hooks/use-agents-filter';
import { DataPagination } from './components/data-pagination';

const AgentsView = () => {
  const [filters, setFilters] = useAgentsFilter();
  const trpc = useTRPC();

  const { data, isLoading } = useQuery(
    trpc.agents.getMany.queryOptions({
      ...filters,
    })
  );

  // Hiển thị loading hoặc null khi chưa có data
  if (isLoading || !data) return null;

  const hasData = data.items.length > 0;

  return (
    <div className="flex-1 pb-4 px-4 md:px-8 flex flex-col gap-y-4">
      <DataTable columns={columns} data={data.items} />

      {!hasData ? (
        <EmptyState
          title="Create your first agent"
          description="Create an agent to join your meeting..."
        />
      ) : (
        /* Chỉ hiện phân trang khi thực sự có dữ liệu */
        <DataPagination 
          page={filters.page} 
          totalPages={data.totalPages} 
          onPageChange={(page) => setFilters({ page })} // nuqs sẽ tự merge các filter còn lại
        />
      )}
    </div>
  );
};

export default AgentsView;