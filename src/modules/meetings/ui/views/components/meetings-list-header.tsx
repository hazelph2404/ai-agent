"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import NewMeetingDialog from "./new-meeting-dialog";
const MeetingsListHeader = () => {
  const [open, setOpenDialog] = useState(false);
  return (
    <>
      {open && <NewMeetingDialog open={open} setOpenDialog={setOpenDialog} />}
      <div className="px-4 py-4 md:px-8 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-medium">My Meetings</h2>
          <Button onClick={() => setOpenDialog(true)}>
            <PlusIcon />
            New Meeting
          </Button>
        </div>
        <div className="flex items-center gap-x-2 p-1">TO DO: filter list</div>
      </div>
    </>
  );
};

export default MeetingsListHeader;
