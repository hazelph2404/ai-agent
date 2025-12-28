'use client'

import { Button } from "@/components/ui/button";
import {PlusIcon} from 'lucide-react';
const AgentListHeader = () => {
    return (
        <div className="py-4 px-4 md:px-8 flex flex-col gap-y-8">
            <div className="flex items-center justify-between">
                <h5 className="font-medium text-xl"> My agents </h5>
                <Button> <PlusIcon/> New Agents </Button>
            </div>

        </div>
    )
}
export default AgentListHeader;