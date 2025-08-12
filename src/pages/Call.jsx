import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import useAuthUser from '../hooks/useAuthUser';
import { useQuery } from '@tanstack/react-query';
import { getStreamToken } from '../lib/api';
import {
  CallControls,
  SpeakerLayout,
  StreamCall,
  StreamTheme,
  StreamVideo,
  StreamVideoClient 
} from "@stream-io/video-react-sdk";
import "@stream-io/video-react-sdk/dist/css/styles.css";
import toast from 'react-hot-toast';

function Call() {
  
       const {id:callersID}=useParams();
        console.log("Callers ID", callersID);
       const [client,setClient]=useState();
       const [call,setCall]=useState();
       const [isConnecting,setIsConnnecting]=useState(true);

       const {authUser,isLoading}=useAuthUser();

       const { data: streamToken } = useQuery({
        queryKey: ['stream-token'],
        queryFn: getStreamToken,
        enabled: !!authUser,
      });
      
       console.log("Token", streamToken?.token  );

       const Stream_api_key=import.meta.env.VITE_STREAM_API_KEY;

       useEffect(()=>{
        const initCall=async()=>{
          if(!streamToken?.token  || !authUser || !callersID) 
          {
            return
          }
         setIsConnnecting(true);
          try {
              const user={
                id:authUser?._id,
                name:authUser?.fullname,
                image:authUser?.profilePic,
              }
              console.log("User", user);
              const videoClient= new StreamVideoClient(
              {
                apiKey: Stream_api_key,
                user,
                token: streamToken.token ,
              }  
              );

              const callInstance= videoClient.call("default", callersID);
              await callInstance.join({create: true});
              setClient(videoClient);
              setCall(callInstance);
              callInstance.on("call.state", (state) => {
                console.log("Call state changed:", state);
              });
              console.log("call started successfully", callInstance);
          } catch (error) {
              toast.error("Failed to start call. Please try again.");
              console.error("Error starting call:", error);
          }
          finally {
            setIsConnnecting(false);
          }
        }
        initCall();
       },[streamToken?.token ,Stream_api_key,authUser])

      //  console.log("Client", client)
      //  console.log("Call", call)
       
       if(isConnecting || isLoading) {
        return (
          <div className="flex items-center justify-center h-screen">
            <span className="Loading loading-spinner "></span>
          </div>
        );
       }
       return (
        <div data-theme="coffee" className="h-screen flex flex-col items-center justify-center">
             <div className='relative'>
              
                 {
                 
                  client && call ?(
                    <StreamVideo client={client}>
                    <StreamCall call={call}>
                      <StreamTheme>
                        <SpeakerLayout />
                        <CallControls />
                      </StreamTheme>
                    </StreamCall>
                  </StreamVideo>
                  ) :
                  <div>
                    <p>Coule not initialize call or try again later.</p>
                  </div>
                 }
             </div>
        </div>
      );
      
}

export default Call