import { StreamCallParticipants,StreamCallControls,StreamCallVideo  } from "@stream-io/video-react-sdk";
const CallContent= ({ call, client }) => {
    return (
        <div className="h-screen flex flex-col items-center justify-center">
        <div className="relative w-full h-full">
            <StreamCallParticipants call={call} />
            <StreamCallControls call={call} client={client} />
            <StreamCallVideo call={call} />
        </div>
        </div>
    );
    }

    export default CallContent