import {Input} from '@/components/ui/input';
import {SearchIcon} from 'lucide-react'
import { useAgentsFilter } from '../../hooks/use-agents-filter';

const AgentsSearchFilter = () => {
        const [filter, setFilter] = useAgentsFilter()
        return (
          <div className="relative w-[200px]">
            <SearchIcon className="pointer-events-none absolute left-2 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search agent..."
              className="bg-white pl-8 w-[200px]"
              value={filter.search}
              onChange={(e) => setFilter({search: e.target.value})}
            />
          </div>
        );
      };
      
export default AgentsSearchFilter;