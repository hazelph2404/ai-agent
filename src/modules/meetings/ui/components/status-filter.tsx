import {
  CircleIcon,
  CircleCheckIcon,
  ClockArrowUpIcon,
  VideoIcon,
  LoaderIcon,
} from "lucide-react";

import CommandSelect from "@/components/command-select";
import { meetingStatus } from "@/db/schema";
import { useMeetingsFilter } from "@/modules/meetings/hooks/use-meetings-filter";

type MeetingStatus = (typeof meetingStatus.enumValues)[number];

const STATUS_OPTIONS = [
  {
    id: "upcoming",
    label: "Upcoming",
    icon: ClockArrowUpIcon,
    color: "text-blue-500",
  },
  { id: "active", label: "Active", icon: VideoIcon, color: "text-green-500" },
  {
    id: "completed",
    label: "Completed",
    icon: CircleCheckIcon,
    color: "text-gray-500",
  },
  {
    id: "processing",
    label: "Processing",
    icon: LoaderIcon,
    animate: true,
    color: "text-yellow-500",
  },
  {
    id: "cancelled",
    label: "Cancelled",
    icon: CircleIcon,
    color: "text-red-500",
  },
];

const StatusFilter = () => {
  const [filter, setFilter] = useMeetingsFilter();
  const handleSelect = (value: string) => {
    const newStatus = value === "" ? undefined : (value as MeetingStatus);
    setFilter({ status: newStatus, page: 1 });
  };

  const options = STATUS_OPTIONS.map((status) => ({
    id: status.id,
    value: status.id,
    children: (
      <div className="flex items-center w-full px-1 py-0.5">
        <status.icon
          className={`
                    mr-3 h-4 w-4 shrink-0 
                    ${status.color} 
                    ${status.animate ? "animate-spin" : ""}
                `}
        />
        <span className="text-sm font-medium text-slate-700">
          {status.label}
        </span>
      </div>
    ),
  }));

  return (
    <div className="w-[180px]">
      <CommandSelect
        placeholder="Status"
        className="h-9 w-full bg-white border-slate-200 hover:bg-slate-50 transition-colors"
        options={options}
        onSelect={handleSelect}
        value={filter.status ?? ""}
      />
    </div>
  );
};
export default StatusFilter;
