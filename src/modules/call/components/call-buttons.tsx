import { useCallStateHooks } from "@stream-io/video-react-sdk";
import { Camera, CameraOff, Mic, MicOff } from "lucide-react"; // Import icon

export const MyVideoButton = () => {
  const { useCameraState } = useCallStateHooks();
  const { camera, isMute } = useCameraState();

  return (
    <button
      onClick={() => camera.toggle()}
      className={`
        flex flex-col items-center justify-center gap-1 p-3 rounded-xl transition-all
        ${isMute 
          ? "bg-destructive/10 text-destructive hover:bg-destructive/20" 
          : "bg-secondary text-secondary-foreground hover:bg-secondary/80"}
        min-w-[100px] border shadow-sm
      `}
    >
      {isMute ? <CameraOff size={20} /> : <Camera size={20} />}
      <span className="text-[10px] font-medium uppercase tracking-wider">
        {isMute ? "Turn on" : "Turn off"}
      </span>
    </button>
  );
};

export const MyMicrophoneButton = () => {
  const { useMicrophoneState } = useCallStateHooks();
  const { microphone, isMute } = useMicrophoneState();

  return (
    <button
      onClick={() => microphone.toggle()}
      className={`
        flex flex-col items-center justify-center gap-1 p-3 rounded-xl transition-all
        ${isMute 
          ? "bg-destructive/10 text-destructive hover:bg-destructive/20" 
          : "bg-secondary text-secondary-foreground hover:bg-secondary/80"}
        min-w-[100px] border shadow-sm
      `}
    >
      {isMute ? <MicOff size={20} /> : <Mic size={20} />}
      <span className="text-[10px] font-medium uppercase tracking-wider">
        {isMute ? "Turn on" : "Turn off"}
      </span>
    </button>
  );
};