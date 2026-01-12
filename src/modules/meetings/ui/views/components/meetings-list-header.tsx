"use client";

import { useState } from "react";
import { PlusIcon, XCircleIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import NewMeetingDialog from "./new-meeting-dialog";
import MeetingSearchFilter from "./meeting-search-filter";
import StatusFilter from "./status-filter";
import AgentIdFilter from "./agent-id-filter";
import { useMeetingsFilter } from "@/modules/meetings/hooks/use-meetings-filter";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { DEFAULT_PAGE_SIZE } from "@/constants";

const MeetingsListHeader = () => {
  const [open, setOpenDialog] = useState(false);
  const [filters, setFilters] = useMeetingsFilter();
  const onClearFilters = () => {
    setFilters(() => ({
      search: null,
      page: DEFAULT_PAGE_SIZE,
      status: null,
      agentId: null,
    }));
  };

  const edited =
    filters.search !== "" ||
    filters.page !== 1 ||
    filters.status !== undefined ||
    filters.agentId !== "";

  return (
    <>
      {/* Luôn render để giữ Animation, Dialog nội bộ sẽ xử lý logic hiển thị dựa trên 'open' */}
      <NewMeetingDialog open={open} setOpenDialog={setOpenDialog} />

      <div className="px-4 py-4 md:px-8 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-medium">My Meetings</h2>
          <Button onClick={() => setOpenDialog(true)}>
            <PlusIcon className="mr-2 h-4 w-4" />
            New Meeting
          </Button>
        </div>
        <ScrollArea>
          <div className="flex items-center justify-start w-full">
            <div className="flex items-center gap-x-2 p-1">
              <MeetingSearchFilter />
              <StatusFilter />
              <AgentIdFilter />
              {edited && (
                <Button
                  variant="outline"
                  className="h-9 text-xs font-normal border-dashed"
                  onClick={onClearFilters}
                >
                  {" "}
                  <XCircleIcon /> Clear{" "}
                </Button>
              )}
            </div>
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </>
  );
};

export default MeetingsListHeader;
