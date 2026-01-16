"use client";

import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { 
  StreamCall, 
  StreamTheme, 
  SpeakerLayout, 
  CallControls
} from "@stream-io/video-react-sdk";
import { useStreamVideoClient } from "../hooks/use-stream-video-client";


interface Props {
  meetingId: string;
}

const CallView = ({ meetingId }: Props) => {
  const trpc = useTRPC();
  const { meeting } = useSuspenseQuery(
    trpc.meetings.getOne.queryOptions({ id: meetingId })
  );
  const {session} = useSession();

  // Khởi tạo client của Stream (cần Token và API Key)
  const client = useStreamVideoClient(, );
  const call = client?.call("default", meetingId);

  if (!call) return <div>Đang khởi tạo cuộc gọi...</div>;

  return (
    <StreamCall call={call}>
      <StreamTheme>
        {/* Giao diện người nói chính hiện to, các thành viên khác hiện nhỏ */}
        <SpeakerLayout participantsBarPosition="bottom" />
        {/* Các nút Mic, Cam, End Call */}
        <CallControls onLeave={() => window.location.assign("/")} />
      </StreamTheme>
    </StreamCall>
  );
};

export default CallView;