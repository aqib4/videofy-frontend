import React from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import FriendRequestCard from "../components/FriendRequestCard";
import { Bell, User2Icon } from "lucide-react";
import NewFriendsCard from "../components/NewFriendsCard";
import NoFriendsFound from "../components/NoFriendsFound";
import {  acceptFriendRequest, getFriendRequest } from "../lib/api";
import Loading from "../components/Loading";
function Notifications() {
  const queryClient = useQueryClient();
  const { data: FriendRequests, isLoading: FriendRequestsLoading,error } = useQuery({
    queryKey: ["FriendRequests"],
    queryFn: getFriendRequest,
  });

  //incoming friend requests
  const inCommingRequest = FriendRequests?.incomingRequests || [];
  console.log("incomming Friend Request", inCommingRequest);
  //accepted friend requests
  const acceptedRequests = FriendRequests?.acceptedRequests || [];
  console.log("accepted Friend Request", acceptedRequests);

  //accepting friend request mutation
  const { mutate: acceptFriendRequestMutation, isPending } = useMutation({
    mutationKey: ["accept-friend-request"],
    mutationFn: acceptFriendRequest,
    onSuccess: () => {
              queryClient.invalidateQueries({ queryKey: ["FriendRequests"], });
    },
  });
  const handleAcceptFriendRequest = async ({ userId }) => {
    acceptFriendRequestMutation({ userId });
  };

  return (
    <section className="bg-black py-4 px-10 min-h-screen w-full flex flex-col items-start gap-6">
      {/* page title */}
      <h2 className="font-sans font-semibold text-2xl text-white/90">
        Notifications
      </h2>
      
      {/* Friend Request section*/}
       {/* title */}
      <div className=" flex justify-center items-center gap-3 mt-6">
        <User2Icon size="29" className="text-primary" />
        <h3 className="text-[1.2rem] text-white font-semibold font-sans">
          Friend Requests
        </h3>
        <span className="bg-primary px-3 rounded-xl  text-black">{inCommingRequest.length}</span>
      </div>
      

      {
        error && (
          <div className="flex justify-center items-center h-full">
            <span className="text-lg text-red-500">Error: {error.message}</span>
          </div>
        )
      }
       {/* friend requests cards */}
      <div className="flex flex-col items-center w-full  gap-4 mt-4">
      {FriendRequestsLoading ? (
          <Loading/>
        ) : inCommingRequest?.length === 0 ? (
          <NoFriendsFound />
        ) : (
          inCommingRequest.map((FriendRequest) => (
            <FriendRequestCard 
            FriendRequest={FriendRequest.sender}
              key={FriendRequest._id}
              AcceptFriendReq={() =>
                handleAcceptFriendRequest({
                  userId: FriendRequest._id,
                })
              }
              isPending={isPending}
            />
          ))
        )}
      </div>
        

      {/* New connections */}
      <h2 className="text-[1.2rem] text-white font-semibold font-sans">
          <Bell size="24" className="inline-block mr-2 text-primary" />
          New Connections
        </h2>
      <div className=" w-full mt-6 ">
      
        <div className="flex flex-col items-center gap-6 mt-4">
          {
            FriendRequestsLoading ? (
                <Loading/>
            ) : acceptedRequests.length === 0 ? (
              <NoFriendsFound />
            ) : (
              acceptedRequests.map((friend) => (
                  <NewFriendsCard NewFriend={friend.recipient} key={friend.recipient._id}/>
              ))
            )
          }
        </div>
      </div>

         
    </section>
  );
}

export default Notifications;
