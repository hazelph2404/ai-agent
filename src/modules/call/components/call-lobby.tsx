"use client";

import Link from "next/link";
import {
  useCallStateHooks,
  VideoPreview,
  ToggleAudioPreviewButton,
  ToggleVideoPreviewButton,
  DefaultVideoPlaceholder,
  StreamVideoParticipant,
} from "@stream-io/video-react-sdk";
import { LogInIcon } from "lucide-react";

import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { generateAvatarUri } from "@/lib/avatar";
import "@stream-io/video-react-sdk/dist/css/styles.css";
const DisabledVideoPreview = () => {
  const { data } = authClient.useSession();

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-zinc-900/90 backdrop-blur-xl transition-all duration-500">
      <div className="relative flex items-center justify-center">
        {/* Hào quang tinh tế phía sau */}
        <div className="absolute inset-0 bg-zinc-400/10 rounded-full blur-3xl animate-pulse" />

        <DefaultVideoPlaceholder
          participant={
            {
              name: data?.user.name ?? "",
              image:
                data?.user.image ??
                generateAvatarUri({
                  seed: data?.user.name ?? "",
                  variant: "initials",
                }),
            } as StreamVideoParticipant
          }
        />
      </div>

      <style jsx global>{`
        /* 1. XÓA BỎ HÌNH VUÔNG (THE SQUARE): */
        /* Stream SDK thường bọc avatar trong một khung vuông có border/background mặc định */
        .str-video__video-placeholder {
          background: linear-gradient(145deg, #27272a, #09090b) !important;
          border: none !important; /* Xóa bỏ viền vuông */
          border-radius: 9999px !important; /* Ép nó thành hình tròn tuyệt đối */
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5) !important;
          width: 120px !important;
          height: 120px !important;
          overflow: hidden !important;
        }

        /* 2. Xử lý phần container bên ngoài nếu vẫn còn bóng dáng hình vuông */
        .str-video__video-placeholder__avatar-container {
          background: transparent !important;
          border: none !important;
        }

        /* 3. Tinh chỉnh Initials (PH) cho sang */
        .str-video__video-placeholder__avatar {
          background-color: transparent !important;
          font-size: 2.5rem !important;
          font-weight: 600 !important;
          color: #ffffff !important;
          letter-spacing: -0.05em !important;
        }
      `}</style>
    </div>
  );
};
const AllowBrowserPermissions = () => (
  <div className="flex items-center justify-center h-full bg-slate-900 text-white p-4 text-center">
    Please allow camera and microphone permissions in your browser.
  </div>
);

interface Props {
  onJoin: () => void;
}

export const CallLobby = ({ onJoin }: Props) => {
  const { useCameraState, useMicrophoneState } = useCallStateHooks();
  const { hasBrowserPermission: hasCameraPermission, devices } =
    useCameraState();
  const { hasBrowserPermission: hasMicPermission } = useMicrophoneState();
  const hasMediaPermission = hasCameraPermission && hasMicPermission;
  const isCameraAvailable = devices && devices.length > 0;
  return (
    <div className="flex flex-col items-center justify-center h-full bg-radial from-sidebar-accent to-sidebar">
      <div className="py-4 px-8 flex flex-col items-center justify-center gap-y-6 bg-background rounded-lg p-10 shadow-sm border">
        <div className="flex flex-col gap-y-2 text-center">
          <h6 className="text-lg font-medium">Ready to join?</h6>
          <p className="text-sm text-muted-foreground">
            Set up your call before joining
          </p>
        </div>

        <div className="max-w-[400px] w-full aspect-video border rounded-xl overflow-hidden shadow-md bg-black relative">
          {!hasCameraPermission ? (
            <AllowBrowserPermissions />
          ) : !isCameraAvailable ? (
            <DisabledVideoPreview />
          ) : (
            <VideoPreview DisabledVideoPreview={DisabledVideoPreview} />
          )}
        </div>

        <div className="flex flex-col items-center gap-y-4 w-full">
          <div className="flex items-center gap-x-3">
            <ToggleAudioPreviewButton />
            <ToggleVideoPreviewButton />
          </div>

          <div className="flex items-center gap-x-3 w-full">
            <Button
              variant="ghost"
              onClick={() => window.location.assign("/")}
              className="flex-1"
            >
              <Link href="/meetings"> Cancel </Link>
            </Button>
            <Button onClick={onJoin} className="flex-1 font-semibold">
              <LogInIcon className="size-4 mr-2" />
              Join
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
