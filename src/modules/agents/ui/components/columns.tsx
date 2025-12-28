"use client";

import type { ColumnDef } from "@tanstack/react-table";
import type { AgentGetOne } from "../../types";
import { botttsNeutral } from "@dicebear/collection";
import GeneratedAvatar from "@/components/generated-avatar";
import { CornerRightDownIcon, VideoIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const columns: ColumnDef<AgentGetOne>[] = [
  {
    accessorKey: "name",
    header: "Agent Name",
    cell: ({ row }) => {
      const name = (row.getValue("name") as string) ?? "";
      const instructions = row.original.instructions ?? "";

      return (
        <div className="flex flex-col gap-y-1">
          <div className="flex items-center gap-x-3">
            <GeneratedAvatar
              seed={name || "Agent"}
              style={botttsNeutral}
              shape="circle"
              className="size-7 border"
            />
            <span className="font-semibold capitalize">{name}</span>
          </div>

          {instructions ? (
            <div className="flex items-center gap-x-2">
              <CornerRightDownIcon className="size-3 text-muted-foreground" />
              <span className="max-w-[240px] truncate text-sm text-muted-foreground">
                {instructions}
              </span>
            </div>
          ) : null}
        </div>
      );
    },
  },
  {
    accessorKey: "meetingCount",
    header: "Meetings",
    cell: ({ row }) => {
      //FIX THIS LATER
      //const count = row.original.meetingCount ?? 0;
      const count = 5;
      return (
        <Badge variant="outline" className="flex items-center gap-x-2 [&>svg]:size-4">
          <VideoIcon />
          <span>
            {count} {count === 1 ? "meeting" : "meetings"}
          </span>

        </Badge>
      );
    },
  },
];
