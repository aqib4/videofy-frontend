import React from "react";

import { Video, CirclePlus,SendHorizontal} from "lucide-react";
function Chat() {
  return (
    <section className="bg-primary/50 min-h-screen w-full flex justify-center items-center p-6">
      <section className="bg-white w-full max-w-5xl min-h-screen flex flex-col rounded-lg shadow-lg">
        {/* chat title */}
        <div className="border-b-[1px] border-b-slate-300 px-4 py-2 flex justify-between items-center">
        <div className="flex gap-4 items-center"> 
              <div className="avatar">
                  <div className="ring-primary/80 ring-offset-base-100 w-10 rounded-full ring-2 ring-offset-2">
                     <img src="#" alt={`Profile picture of `} />
                  </div>   
              </div>  
              <div>
                <h4>Muhammad Aqib</h4>
                <span className="text-gray-400">2 members, 2 Online</span>
              </div>
          </div>

           <div className="bg-primary/80 px-3 py-1 rounded-full">
            <Video size={29} className="text-white"/>
           </div>
        </div>
        {/* chat body */}
        <div className="bg-white flex-1 overflow-y-auto px-4 md:px-8 mt-12 w-full">
              <div className="flex justify-between items-center mb-4">
              <span className="border-b-2 border-cyan-50"></span>
              <p className="text-gray-500 text-sm">Today at 4:20 PM</p>
              </div>
              <div>
                {/* Sender messages */}
                   <div>
                      <div className="flex items-start gap-4 mb-4">
                          <div className="avatar">
                              <div className="ring-primary/80 ring-offset-base-100 w-10 rounded-full ring-2 ring-offset-2">
                                <img src="#" alt={`Profile picture of `} />
                              </div>   
                          </div>
                          <div className="bg-gray-100 p-3 rounded-lg max-w-[70%]">
                            <p className="text-gray-700">Hello, how are you?</p>
                          </div>
                      </div>
                   </div>
                   {/* Reciver Messages */}
                   <div>
                      <div className="flex items-start gap-4 mb-4">
                          <div className="avatar">
                              <div className="ring-primary/80 ring-offset-base-100 w-10 rounded-full ring-2 ring-offset-2">
                                <img src="#" alt={`Profile picture of `} />
                              </div>   
                          </div>
                          <div className="bg-blue-100 p-3 rounded-lg max-w-[70%]">
                            <p className="text-gray-700">I'm good, thanks! How about you?</p>
                          </div>
                      </div>
                   </div>
              </div>
        </div>
        {/* chat input */}
        <div className="p-4 border-t-[1px] border-gray-200 w-full flex items-center gap-3">
          <CirclePlus size={24} className="text-gray-500 mb-2" />
          <input
            type="text"
            placeholder="Type a message..."
            className="w-full p-2 border border-gray-400 rounded-full focus:outline-none focus:ring-2 focus:ring-primary"
          />
         <SendHorizontal size={34} className="text-gray-500 mt-2 ml-2 cursor-pointer" />
        </div>
      </section>
    </section>
  );
}

export default Chat;
