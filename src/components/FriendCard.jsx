import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getFriends } from "../lib/api";
import { LANGUAGE_TO_FLAG } from "../constants";

function FriendCard() {
  const {data:friends=[],isLoading}=useQuery({
    queryKey:['friends'],
    queryFn:getFriends,
  });

  return (
    <section>
      {/* single friend card */}
      {friends?.length > 0 ? (
        isLoading ? (
          <div className="flex items-center justify-center h-full">
            <div className="loader">Loading....</div>
          </div>
        ) : (
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 shadow-sm  shadow-slate-600 p-4 rounded-md">
          {
          friends.map(
            ({
              id,
              fullname,
              profilePic,
              learningLanguage,
              nativeLanguage,
            }) => (
              <li
                key={id}
              >
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
                <div className="flex flex-col md:flex-row gap-2 mt-4">
                  <span className="flex items-center gap-2 text-white bg-primary/65 px-4 py-1 rounded-full w-44">
                    {countryFlag(nativeLanguage)}
                    Native:{nativeLanguage}
                  </span>
                  <span className="flex items-center gap-2 bg-transparent text-white  border-[1px] px-4 py-1 rounded-full w-44">
                  {countryFlag(nativeLanguage)}
                    Learning:{learningLanguage}
                  </span>
                </div>
                {/* friend card footer */}
                <button className="w-full  border-[1px] rounded-full px-4 py-3   mt-4 bg-transparent text-white hover:bg-primary/95 transition-colors duration-300">
                  Message
                </button>
              </li>
            )
          )}
          </ul>
        )
      ) : (
        // No friends found
        <div className="p-4 md:p-8">
          <h2 className="text-[18px] font-bold text-white">No Friends Found</h2>
          <p className="text-white/70 mt-2">
            You can add friends to start chatting.
          </p>
        </div>
      )}
    </section>
  );
}

export default FriendCard;


export function countryFlag(language){
     if(!language) return null;
     const langToLower= language.toLowerCase();
     const countryCode= LANGUAGE_TO_FLAG[langToLower];
     if(countryCode){
        return(
          <img
          src={`https://flagcdn.com/w20/${countryCode}.png`}
          className="h-3 mr-1"
          alt="Country Flag"
          />
        )
     }
      return null;

}