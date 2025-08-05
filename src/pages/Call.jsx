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
  useCallStateHooks,
  CallingState,
  StreamVideoClient 
} from "@stream-io/video-react-sdk";
import "@stream-io/video-react-sdk/dist/css/styles.css";
import toast from 'react-hot-toast';

function Call() {
  
       const {callersID}=useParams();
       const {client,setClient}=useState();
       const {call,setCall}=useState();
       const {isConnecting,setIsConnnecting}=useState();

       const {authUser,isLoading}=useAuthUser();

       const { data: streamToken } = useQuery({
        queryKey: ['stream-token'],
        queryFn: getStreamToken,
        enabled: !!authUser,
      });
      
       console.log("Token", streamToken  );

       const Stream_api_key=import.meta.env.VITE_STREAM_API_KEY;

       useEffect(()=>{
        const initCall=async()=>{
          if(!streamToken.token  || !authUser || !callersID) return;
          setIsConnnecting(true);

          try {
              const user={
                id:authUser._id,
                name:authUser.name,
                image:authUser.image,
              }
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
       },[streamToken.token ,Stream_api_key,setCall,setClient,setIsConnnecting,authUser,callersID])

       if(isConnecting || isLoading) {
        return (
          <div className="flex items-center justify-center h-screen">
            <span className="loader loading-spinner "></span>
          </div>
        );
       }
       return (
        <StreamVideo client={client}>
          <StreamCall call={call}>
            <StreamTheme>
              <SpeakerLayout />
              <CallControls />
            </StreamTheme>
          </StreamCall>
        </StreamVideo>
      );
      
}

export default Call