import React, { use, useEffect, useState } from 'react'
import {  useQuery } from '@tanstack/react-query';
import {  getRecommendedUsers, GetOutGoingFriendRequests } from '../lib/api';
import  { Toaster } from 'react-hot-toast';
import { countryFlag } from './FriendCard';
import useSendFriendRequest from '../hooks/useSendFriendRequest';
import { set } from 'mongoose';

function NewFriends() {

    const [outGoingRequestId,setOutGoingRequestId]= useState(new set());


    // Fetch recommended users
     const {data:recommendusers,isLoading}=useQuery({
        queryKey:['recommendusers'],
        queryFn:getRecommendedUsers,
        });

    //pending friend requests to other users
    const {data:outGoingRequests}=useQuery({
        queryKey:['outGoingRequests'],
        queryFn:GetOutGoingFriendRequests,
    });
    // Mutation to send friend request , custom hook.
    const {friendRequestMutate}=useSendFriendRequest();
   
    // Update the outGoingRequestId state with the IDs of the outgoing requests
    useEffect(() => {
      const outGoingIds=new Set();
      if(outGoingRequests && outGoingRequests?.sentRequests?.length > 0) {
        outGoingRequests.sentRequests.forEach(req => {
          outGoingIds.add(req);
        });
      }
      setOutGoingRequestId(outGoingIds);
    }, [outGoingRequests]);
    
   // Function to handle sending friend request
   const handleUserRequest = ({userId}) => {
    friendRequestMutate({userId});
    console.log("Friend request sent to user with ID:", userId);
   }
    
   
  return (
    <section className='mt-10'>
      {/* single friend card */}
      {recommendusers?.users?.length > 0 ? (
        isLoading ? (
          <div className="flex items-center justify-center h-full">
            <div className="loader">Loading....</div>
          </div>
        ) : (
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4  p-4 shadow-sm shadow-slate-600 rounded-md">
          {
          recommendusers.users.map(
            ({
              id,
              firstName,
              profilePicture: profilePic,
              leaningLanguage,
              nativeLanguage,
            }) => (
              <li
                key={id}
                className='shadow-sm  shadow-slate-600 p-3 rounded-md'
              >
                {/* friend card header */}
                <div className="flex gap-4 items-center">
                  <div className="avatar">
                    <div className="ring-primary ring-offset-base-100 w-14 h-full rounded-full ring-2 ring-offset-2">
                      <img
                        src={profilePic || `/vite.svg`}
                        alt={`Profile picture of ${firstName}`}
                      />
                    </div>
                  </div>
                  <h2 className="text-[18px] font-bold text-white">
                    {firstName}
                  </h2>
                </div>
                {/* friend card body */}
                <div className="flex flex-col md:flex-row gap-2 mt-4">
                  <span className="flex items-center gap-1 text-sm text-white bg-primary/65 px-3 py-1 rounded-full w-44">
                   {countryFlag(nativeLanguage)}
                    Native: {capitalizeString(nativeLanguage)}
                  </span>
                  <span className="flex items-center gap-2 bg-transparent text-sm text-white  border-[1px] px-2 py-1 rounded-full w-44">
                    {countryFlag(leaningLanguage)}
                    Learning:{leaningLanguage}
                  </span>
                </div>
                {/* friend card footer */}
                <button
                onClick={()=> handleUserRequest({userId:id})}
                className="w-full  border-[1px] rounded-full px-4 py-3   mt-4 bg-transparent text-white hover:bg-primary/95 transition-colors duration-300">
                  {
                    // Display "Request Sent" if the user has already sent a request
                    recommendusers?.sentRequests?.includes(id) ? "Request Sent" : "Send Request"
                  }
                </button>
              </li>
            )
          )}
          </ul>
        )
      ) : (
        // No friends found
        <div className="p-4 md:p-8">
          <h2 className="text-[18px] font-bold text-white">Nobody Found.</h2>
          <p className="text-white/70 mt-2">
            Stay Tuned for more updates and features. We are working hard to bring you new friends and language exchange partners soon!
          </p>
        </div>
      )}
      <Toaster/>
    </section>
  )
}

export default NewFriends

const capitalizeString=(str)=>{
    return str.charAt(0).toUpperCase() + str.slice(1);
}