"use client";

import { format } from "date-fns";
import humanizeDuration from "humanize-duration";
import type { ColumnDef } from "@tanstack/react-table";
import type { MeetingGetMany } from "../../../types";
import { botttsNeutral } from "@dicebear/collection";

import GeneratedAvatar from "@/components/generated-avatar";
import { Badge } from "@/components/ui/badge";
import {
  CircleCheckIcon,
  CircleXIcon,
  ClockArrowUpIcon,
  LoaderIcon,
} from "lucide-react";


function formatDuration(seconds: number) {
  return humanizeDuration(seconds * 1000, {
    largest: 1,
    round: true,
    units: ["h", "m", "s"],
  });
}

const STATUS_CONFIG = {
  completed: {
    label: "Completed",
    icon: CircleCheckIcon,
    variant: "default",
  },
  processing: {
    label: "Processing",
    icon: LoaderIcon,
    variant: "secondary",
  },
  upcoming: {
    label: "Upcoming",
    icon: ClockArrowUpIcon,
    variant: "outline",
  },
  cancelled: {
    label: "Cancelled",
    icon: CircleXIcon,
    variant: "destructive",
  },
} as const;


export const columns: ColumnDef<MeetingGetMany[number]>[] = [
  {
    accessorKey: "name",
    header: "Meeting",
    cell: ({ row }) => {
      const name = row.original.name ?? "Untitled meeting";
      const agentName = row.original.agent?.name ?? "Unknown agent";

      return (
        <div className="flex items-center gap-x-3">
          <GeneratedAvatar
            seed={agentName}
            style={botttsNeutral}
            shape="circle"
            className="size-10 border"
          />

          <div className="flex flex-col min-w-0">
            <span className="font-semibold truncate">{name}</span>
            <span className="text-sm text-muted-foreground truncate">
              {agentName}
            </span>
          </div>
        </div>
      );
    },
  },

  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      const config = STATUS_CONFIG[status as keyof typeof STATUS_CONFIG];

      if (!config) return null;

      const Icon = config.icon;

      return (
        <Badge
          variant={config.variant}
          className="flex items-center gap-x-1.5 capitalize"
        >
          <Icon className="size-3.5" />
          {config.label}
        </Badge>
      );
    },
  },

  {
    accessorKey: "startedAt",
    header: "Started",
    cell: ({ row }) => {
      const startedAt = row.original.startedAt;

      return (
        <span className="text-sm text-muted-foreground">
          {startedAt
            ? format(new Date(startedAt), "MMM d, yyyy · HH:mm")
            : "—"}
        </span>
      );
    },
  },

  {
    accessorKey: "duration",
    header: "Duration",
    cell: ({ row }) => {
      const duration = row.original.duration;

      if (duration == null) {
        return <span className="text-muted-foreground">—</span>;
      }

      return (
        <span className="text-sm">
          {formatDuration(duration)}
        </span>
      );
    },
  },
];
