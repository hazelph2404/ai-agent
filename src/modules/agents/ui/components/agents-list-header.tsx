"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusIcon, XCircleIcon } from "lucide-react";
import NewAgentDialog from "./new-agent-dialog";
import { useAgentsFilter } from "../../hooks/use-agents-filter";
import AgentsSearchFilter from "./agents-search-filter";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { ScrollBar } from "@/components/ui/scroll-area";

const AgentsListHeader = () => {
  const [searchValue, setSearchValue] = useAgentsFilter();
  const [open, setOpen] = useState(false);

  const isAnyFilterModified = !!searchValue.search;

  const onClearFilters = () => {
    setSearchValue({
      search: "",
      page: 1,
    });
  };

  return (
    <>
      <NewAgentDialog open={open} setOpenDialog={setOpen} />

      <div className="px-4 py-4 md:px-8 space-y-4">
        <div className="flex items-center justify-between">
          <h5 className="text-xl font-medium">My Agents</h5>
          <Button onClick={() => setOpen(true)}>
            <PlusIcon className="mr-2 size-4" />
            New Agent
          </Button>
        </div>
        <ScrollArea>
        <div className="flex items-center gap-2">
          <AgentsSearchFilter />

          {isAnyFilterModified && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearFilters}
              className="text-muted-foreground"
            >
              <XCircleIcon className="mr-1 size-4" />
              Clear
            </Button>
          )}
        </div>
        <ScrollBar orient="horizontal"/>
        </ScrollArea>
      </div>
    </>
  );
};

export default AgentsListHeader;
