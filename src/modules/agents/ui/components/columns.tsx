"use client";

import type { ColumnDef } from "@tanstack/react-table";
import type { AgentsGetMany } from "../../types";
import { botttsNeutral } from "@dicebear/collection";
import GeneratedAvatar from "@/components/generated-avatar";
import { CornerRightDownIcon, VideoIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const columns: ColumnDef<AgentsGetMany>[number] = [
  {
    accessorKey: "name",
    header: "Agent Name",
    cell: ({ row }) => {
      const name = row.original.name ?? "";
      const instructions = row.original.instructions ?? "";

      return (
        <div className="flex flex-col gap-y-1 py-1">
          <div className="flex items-center gap-x-3">
            <GeneratedAvatar
              seed={name || "Agent"}
              style={botttsNeutral}
              shape="circle"
              className="size-10 border"
            />
            <span className="font-semibold capitalize">{name}</span>
          </div>

          {instructions && (
            <div className="flex items-center gap-x-2">
              <CornerRightDownIcon className="size-3 text-muted-foreground" />
              <span className="max-w-[240px] truncate text-sm text-muted-foreground">
                {instructions}
              </span>
            </div>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "meetingCount",
    header: "Meetings",
    cell: ({ row }) => {
      return (
        <div className="flex h-full items-center justify-end">
          <Badge
            variant="outline"
            className="flex items-center gap-x-2 [&>svg]:size-4"
          >
            <VideoIcon />
            <span>
              {row.original.meetingCount}
              {row.original.meetingCount === 1 ? " meeting" : " meetings"}
            </span>
          </Badge>
        </div>
      );
    },
  },
];
