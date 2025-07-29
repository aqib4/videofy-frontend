import React from 'react'

function NewFriendsCard({fullname,profilePic,id}) {
  return (
    <div key={id} className="flex flex-col lg:flex-row justify-between items-center gap-3 ">
    <div className="flex justify-between items-center gap-3">
    <div className="avatar">
        <div className="ring-primary ring-offset-base-100 w-14 rounded-full ring-2 ring-offset-2">
        <img src={profilePic} alt={`Profile picture of ${fullname}`} />
        </div>
    </div>
    <div>
        <strong className="text-[1.2rem] text-gray-300">{fullname}</strong>
        <p className="text-white">{`${fullname} has accepted your friend Request.`}</p>
    </div>
    </div>
    <div className="flex flex-col md:flex-row gap-2">
       <button className="bg-primary text-black font-sans text-[1rem] rounded-full w-32 h-10">New Friend</button>
       <button className="bg-white text-black font-sans text-[1rem] rounded-full w-32 h-10">Start Chatting</button>
    </div>

   

</div>
  )
}

export default NewFriendsCard