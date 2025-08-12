import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getFriends } from "../lib/api";
import { LANGUAGE_TO_FLAG } from "../constants";
import NoFriendsFound from "./NoFriendsFound";
import { capitalizeString } from "./NewFriends";
import { Link } from "react-router";
import Loading from "./Loading";
function FriendCard() {
  const { data: friends, isLoading } = useQuery({
    queryKey: ["friends"],
    queryFn: getFriends,
  });

  console.log("all friends data", friends);

  return (
    <section className="my-12">
      {/* single friend card */}
      {isLoading ? (
        <div className="flex items-center justify-center h-full">
          <Loading/>
        </div>
      ) : friends?.length === 0 ? (
        <NoFriendsFound />
      ) : (
        // No friends found
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4  p-4 rounded-md">
          {friends?.map(
            ({
              _id,
              fullname,
              profilePic,
              learningLanguage,
              nativeLanguage,
            }) => (
              <li key={_id}>
                {/* friend card header */}
                <div className="flex gap-4 items-center">
                  <div className="avatar">
                    <div className="ring-primary ring-offset-base-100 w-14 h-full rounded-full ring-2 ring-offset-2">
                      <img
                        src={profilePic}
                        alt={`Profile picture of ${fullname}`}
                      />
                    </div>
                  </div>
                  <h2 className="text-[18px] font-bold text-white">
                    {fullname}
                  </h2>
                </div>
                {/* friend card body */}
                <div className="flex flex-col md:flex-row text-[0.8rem] gap-2 mt-4">
                  <span className="flex items-center gap-1 text-white bg-primary/65 px-4 py-1 rounded-full w-44">
                    {countryFlag(nativeLanguage)}
                    Native : {capitalizeString(nativeLanguage)}
                  </span>
                  <span className="flex items-center gap-0 bg-transparent text-white  border-[1px] px-3 py-1 rounded-full w-44">
                    {countryFlag(nativeLanguage)}
                    Learning: {capitalizeString(learningLanguage) || "N/A"}
                  </span>
                </div>
                {/* friend card footer */}
                <Link
                  to={`/chat/${_id}`}
                  className="inline-block border border-white cursor-pointer mt-4 text-center rounded-full px-4 py-3 bg-transparent text-white hover:bg-primary/95 transition-colors duration-300 w-full"
                >
                  Message
                </Link>
              </li>
            )
          )}
        </ul>
      )}
    </section>
  );
}

export default FriendCard;

export function countryFlag(language) {
  if (!language) return null;
  const langToLower = language.toLowerCase();
  const countryCode = LANGUAGE_TO_FLAG[langToLower];
  if (countryCode) {
    return (
      <img
        src={`https://flagcdn.com/w20/${countryCode}.png`}
        className="h-3 mr-1"
        alt="Country Flag"
      />
    );
  }
  return null;
}
