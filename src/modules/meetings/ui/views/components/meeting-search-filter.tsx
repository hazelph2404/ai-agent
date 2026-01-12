import {Input} from '@/components/ui/input'
import { useMeetingsFilter } from '@/modules/meetings/hooks/use-meetings-filter';
import {SearchIcon} from 'lucide-react';
const MeetingSearchFilter = () => {
    const [filter, setFilter] = useMeetingsFilter();
    return(
        <div className="relative max-w-sm">
            <SearchIcon className="pointer-events-none absolute top-1/2 -translate-y-1/2 translate-x-1/2 h-4 w-4 text-muted-foreground"/>
            <Input value={filter.search} placeholder="Enter meeting..." className="pl-7" onChange={ (e) => setFilter({search: e.target.value})}/>
        </div>
    )
}
export default MeetingSearchFilter;