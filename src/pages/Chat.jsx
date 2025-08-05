import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Video, CirclePlus, SendHorizontal } from "lucide-react";
import {getAuthUser, getStreamToken} from "../lib/api";
import  {StreamChat} from "stream-chat";
import { useParams } from "react-router";
import { toast } from "react-hot-toast";
// Importing the StreamChat component
import { Chat, Channel, Window, MessageList, MessageInput, Thread , ChannelHeader } from "stream-chat-react";
import { axiosInstance } from "../lib/axios";
import CallButton from "../components/CallButton";
import useAuthUser from "../hooks/useAuthUser";
function ChatPage() {
      
       const api_key_stream= import.meta.env.VITE_STREAM_API_KEY;
      const {id:targetUser}=useParams();
      console.log("targetUser", targetUser);
      const [clientChat ,setClientChat]=useState(null)
      const [channel, setChannel] = useState(null);
      const [Loading, setLoading] = useState(true);

      const {  authUser } = useAuthUser();
      
      console.log("authUser11", authUser?._id);
      const {data}=useQuery({
      queryKey: ["stream-token"],
      queryFn:getStreamToken,
      enabled: !!authUser,
     }) 
   
     useEffect(()=>{
        const initChat=async()=>{
        if( !data?.token || !authUser) return;
        const client=StreamChat.getInstance(api_key_stream)

        try {          
          await client.connectUser({
            id: authUser?._id,
            name: authUser?.fullname,
            image: authUser?.profilePic,
          }, data.token);
         
         const channelId=[authUser._id,targetUser].sort().join("-");
         
         const currentChannel=client.channel("messaging",channelId,{
             members: [authUser._id, targetUser],
         })
        await currentChannel.watch();
        setClientChat(client);
        setChannel(currentChannel);

        } catch (error) {
          toast.error("Failed to connect to chat service. Please try again later.");
          console.error("Chat initialization error:", error);
        } finally {
          setLoading(false);
        }
      }
      initChat();
     },[data, authUser, api_key_stream, targetUser]);

  if (Loading || !clientChat || !channel) {
    return (
      <section className="bg-primary/50 overflow-y-hidden w-full h-[93vh] flex justify-center items-center p-6">
        <div className="text-white">Loading chat...</div>
      </section>
    );
  }
  const handleVideoCall = () => {
    if(channel){
      const callUrl=`${window.location.origin}/call/${channel.id}`;
      channel.sendMessage({
        text:`Let's have a video call! ${callUrl}`,
      })
    }
    toast.success("Video call link sent in chat!");
  };
  
  return (
    <section className="h-[91vh] p-4">
      <Chat client={clientChat} >
        <Channel channel={channel}>
          <div className="w-full relative">
          <CallButton handleVideoCall={handleVideoCall}/>
          <Window>
          <ChannelHeader />
            <MessageList />
            <MessageInput focus/>
          </Window>
          </div>
          <Thread />
        </Channel>

     </Chat >

    </section>
  );
}

export default ChatPage;
