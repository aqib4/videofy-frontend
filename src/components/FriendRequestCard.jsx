import React from "react";

export default function FriendRequestCard({fullname,profilePic,id, }) { // Placeholder for the profile picture URL
    // const profilePictureUrl = profilePicture || "https://via.placeholder.com/150";
  return (
    <div key={id} className="flex flex-col lg:flex-row justify-between items-center gap-3 w-full">
            <div className="flex justify-between items-center gap-3">
            <div className="avatar">
                <div className="ring-primary ring-offset-base-100 w-14 rounded-full ring-2 ring-offset-2">
                <img src={profilePic} alt={`Profile picture of ${fullname}`} />
                </div>
            </div>
            <div>
                <strong className="text-[1.2rem] text-gray-300">{fullname}</strong>
                
                        <div className="flex flex-col md:flex-row gap-2 mt-3">
                    <span className="text-center rounded-full w-40 text-black bg-green-600">Native : Spanish</span>
                    <span className="text-center border-[1px] rounded-full w-40 text-white bg-transparent ">Learning : German</span>
                </div>
            </div>
            </div>
             <div className="flex flex-col md:flex-row gap-2">
               <button className="bg-primary text-black font-sans text-[1.2rem] rounded-full w-32 h-10">Accept</button>
               <button className="bg-white text-black font-sans text-[1.2rem] rounded-full w-32 h-10">Reject</button>
             </div>
      </div>

  );
}
