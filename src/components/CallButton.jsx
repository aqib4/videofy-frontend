import { VideoIcon } from "lucide-react";

const CallButton = ({ handleVideoCall }) => (
   <div className=" absolute top-0  p-3 border-b flex items-center justify-end mx-auto   w-full ">
     <button
      className="btn bg-primary/95 hover:bg-primary/100 btn-sm text-white rounded-full"
      onClick={handleVideoCall}
    >
      <VideoIcon className="size-5" />
    </button>
   </div>
  );

export default CallButton;