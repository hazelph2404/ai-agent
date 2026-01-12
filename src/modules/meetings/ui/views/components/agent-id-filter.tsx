import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import CommandSelect from "@/components/command-select";
import { useMeetingsFilter } from "@/modules/meetings/hooks/use-meetings-filter";
import GeneratedAvatar from "@/components/generated-avatar";
import { botttsNeutral } from "@dicebear/collection";
const AgentIdFilter = () => {
  const [filter, setFilter] = useMeetingsFilter();
  const trpc = useTRPC();
  const [agentSearch, setAgentSearch] = useState("");
  const { data } = useQuery(
    trpc.agents.getMany.queryOptions({
      pageSize: 100,
      search: agentSearch,
    })
  );
  const handleSelect = (value: string) => {
    setFilter({
      agentId: value === "" ? undefined : value,
    });
  };
  const options =
  data?.items.map((agent) => ({
    id: agent.id,
    value: agent.id,
    children: (
      <div className="flex items-center gap-x-3 w-full px-2 py-1.5 transition-colors">
        <div className="flex-shrink-0">
          <GeneratedAvatar
            seed={agent.name}
            style={botttsNeutral}
            shape="circle"
            className="size-6 border shadow-sm"
          />
        </div>
        <span className="text-sm font-medium text-slate-700 truncate">
          {agent.name}
        </span>
      </div>
    ),
  })) ?? [];
  return (
    <div className="w-[220px]">
      <CommandSelect
        placeholder="Agent"
        options={options}
        value={filter.agentId ?? ""}
        onSelect={handleSelect}
        onSearch={setAgentSearch}
      />
    </div>
  );
};

export default AgentIdFilter;
