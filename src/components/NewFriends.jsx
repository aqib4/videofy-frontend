import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getRecommendedUsers, GetOutGoingFriendRequests } from "../lib/api";
import { Toaster } from "react-hot-toast";
import { countryFlag } from "./FriendCard";
import useSendFriendRequest from "../hooks/useSendFriendRequest";
import Loading from "./Loading";
import {
  CircleCheck,
  Loader,
  LocateIcon,
  LocationEdit,
  UserPlus,
} from "lucide-react";
function NewFriends() {
  const [outGoingRequestId, setOutGoingRequestId] = useState(new Set());

  // Fetch recommended users
  const { data: recommendusers, isLoading } = useQuery({
    queryKey: ["recommendusers"],
    queryFn: getRecommendedUsers,
  });

  //pending friend requests to other users
  const { data: outGoingRequests } = useQuery({
    queryKey: ["outGoingRequests"],
    queryFn: GetOutGoingFriendRequests,
  });
  // Mutation to send friend request , custom hook.
  // const {friendRequestMutate}=useSendFriendRequest();
  const { friendRequestMutate } = useSendFriendRequest();

  // Update the outGoingReq    uestId state with the IDs of the outgoing requests
  useEffect(() => {
    const outGoingIds = new Set();
    if (outGoingRequests && outGoingRequests?.length > 0) {
      outGoingRequests.forEach((req) => {
        outGoingIds.add(req.recipient._id);
      });
    }
    setOutGoingRequestId(outGoingIds);
  }, [outGoingRequests]);

  // Function to handle sending friend request
  const handleUserRequest = ({ userId }) => {
    setOutGoingRequestId((prev) => new Set(prev).add(userId));

    friendRequestMutate({ userId });
    console.log("Friend request sent to user with ID:", userId);
  };

  return (
    <section className="mt-10">
      {/* single friend card */}
      {isLoading ? (
        <Loading/>
      ) : recommendusers?.users?.length > 0 ? (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4  p-4 shadow-sm shadow-slate-600 rounded-md">
          {recommendusers.users.map(
            ({
              id,
              firstName,
              profilePicture: profilePic,
              leaningLanguage,
              nativeLanguage,
              location,
            }) => {
              const hasRequestBeenSent = outGoingRequestId.has(id);

              return (
                <li
                  key={id}
                  className="bg-gray-900 hover:shadow-sm  hover:shadow-slate-600 px-4 py-6 rounded-md transition-all duration-300"
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
                    <div>
                      <h2 className="text-[18px] font-bold text-white">
                        {firstName}
                      </h2>
                      <span className="text-sm text-white/70">
                        <LocationEdit className="size-4 inline-block mr-1" />
                        {location}
                      </span>
                    </div>
                  </div>
                  {/* friend card body */}
                  <div className="flex flex-col md:flex-row gap-2 mt-4 text-[0.8rem]">
                    <span className="flex items-center gap-1 text-white bg-primary/65 px-1 py-1 rounded-full w-44">
                      {countryFlag(nativeLanguage)}
                      Native : {capitalizeString(nativeLanguage)}
                    </span>
                    <span className="flex items-center gap-0 bg-transparent text-white  border-[1px] px-1 py-1 rounded-full w-44">
                      {countryFlag(nativeLanguage)}
                      Learning: {capitalizeString(leaningLanguage) || "N/A"}
                    </span>
                  </div>
                  {/* friend card footer */}
                  <button
                    className={`btn w-full mt-8 hover:bg-primary rounded-full py-2 ${
                      hasRequestBeenSent
                        ? "btn-disabled !text-white"
                        : "bg-transparent text-white"
                    } `}
                    onClick={() => handleUserRequest({ userId: id })}
                    disabled={hasRequestBeenSent || isLoading}
                  >
                    {hasRequestBeenSent ? (
                      <>
                        <Loader className="size-4 mr-2 text-white" />
                        Request Sent
                      </>
                    ) : (
                      <>
                        <UserPlus className="size-4 mr-2" />
                        Send Friend Request
                      </>
                    )}
                  </button>
                </li>
              );
            }
          )}
        </ul>
      ) : (
        // No friends found
        <div className="p-4 md:p-8">
          <h2 className="text-[18px] font-bold text-white">Nobody Found.</h2>
          <p className="text-white/70 mt-2">
            Stay Tuned for more updates and features. We are working hard to
            bring you new friends and language exchange partners soon!
          </p>
        </div>
      )}
      <Toaster />
    </section>
  );
}

export default NewFriends;

export const capitalizeString = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
