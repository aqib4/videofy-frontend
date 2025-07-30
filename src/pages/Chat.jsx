import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Video, CirclePlus, SendHorizontal } from "lucide-react";
import {getStreamToken} from "../lib/api";

function Chat() {

     const {data}=useQuery({
    queryKey: ["stream-token"],
    queryFn:getStreamToken,
     })
  

  return (
    <section className="bg-primary/50 overflow-y-hidden w-full flex justify-center items-center p-6">
      <section className="bg-white w-full max-w-5xl  flex flex-col rounded-lg shadow-lg">
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
            <Video size={29} className="text-white" />
          </div>
        </div>
        {/* chat body */}
        <div className="bg-white flex-1 max-h-[400px] overflow-y-auto px-4 md:px-8 mt-12 w-full">
          <div className="flex justify-between items-center mb-4">
            <span className="border-b-2 border-cyan-50"></span>
            <p className="text-gray-500 text-sm">Today at 4:20 PM</p>
          </div>
          <div className="flex flex-col gap-8">
            {/* Sender messages */}
            <div className=" justify-end flex">
              <div className=" flex flex-col items-start gap-2 mb-4">
                <div className="bg-gray-100  p-3 md:rounded-l-full md:rounded-br-sm md:rounded-r-full md:rounded-top-full max-w-xl">
                  <p className="text-gray-700">Hello, how are you? i hope you are doing great. yes we are all happy for your success and wishing you great life ahead</p>
                </div>
                <div className="flex items-center gap-2 text-gray-500">
                  <div className="avatar">
                    <div className="ring-primary/80 ring-offset-base-100 w-5 rounded-full ring-2 ring-offset-2">
                      <img src="#" alt={`Profile picture of `} />
                    </div>
                  </div>
                  <p>Today at 5:40 Am</p>
                </div>
              </div>
            </div>
            {/* Reciver Messages */}
            <div className="flex justify-start">
              <div className="flex items-start gap-4 mb-4">
                <div className="avatar">
                  <div className="ring-primary/80 ring-offset-base-100 w-10 rounded-full ring-2 ring-offset-2">
                    <img src="#" alt={`Profile picture of `} />
                  </div>
                </div>
                <div className="bg-blue-100 p-3 rounded-l-full rounded-b-sm rounded-r-full max-w-[70%]">
                  <p className="text-gray-700">
                    I'm good, thanks! How about you?
                  </p>
                </div>
              </div>
            </div>
            {/* Sender messages */}
            <div className=" justify-end flex">
              <div className=" flex flex-col items-start gap-2 mb-4">
                <div className="bg-gray-100  p-3 md:rounded-l-full md:rounded-br-sm md:rounded-r-full md:rounded-top-full max-w-xl">
                  <p className="text-gray-700">Hello, how are you? i hope you are doing great. yes we are all happy for your success and wishing you great life ahead</p>
                </div>
                <div className="flex items-center gap-2 text-gray-500">
                  <div className="avatar">
                    <div className="ring-primary/80 ring-offset-base-100 w-5 rounded-full ring-2 ring-offset-2">
                      <img src="#" alt={`Profile picture of `} />
                    </div>
                  </div>
                  <p>Today at 5:40 Am</p>
                </div>
              </div>
            </div>
            {/* Reciver Messages */}
            <div className="flex justify-start">
              <div className="flex items-start gap-4 mb-4">
                <div className="avatar">
                  <div className="ring-primary/80 ring-offset-base-100 w-10 rounded-full ring-2 ring-offset-2">
                    <img src="#" alt={`Profile picture of `} />
                  </div>
                </div>
                <div className="bg-blue-100 p-3 rounded-l-full rounded-b-sm rounded-r-full max-w-[70%]">
                  <p className="text-gray-700">
                    I'm good, thanks! How about you?
                  </p>
                </div>
              </div>
            </div>
            {/* Sender messages */}
            <div className=" justify-end flex">
              <div className=" flex flex-col items-start gap-2 mb-4">
                <div className="bg-gray-100  p-3 md:rounded-l-full md:rounded-br-sm md:rounded-r-full md:rounded-top-full max-w-xl">
                  <p className="text-gray-700">Hello, how are you? i hope you are doing great. yes we are all happy for your success and wishing you great life ahead</p>
                </div>
                <div className="flex items-center gap-2 text-gray-500">
                  <div className="avatar">
                    <div className="ring-primary/80 ring-offset-base-100 w-5 rounded-full ring-2 ring-offset-2">
                      <img src="#" alt={`Profile picture of `} />
                    </div>
                  </div>
                  <p>Today at 5:40 Am</p>
                </div>
              </div>
            </div>
            {/* Reciver Messages */}
            <div className="flex justify-start">
              <div className="flex items-start gap-4 mb-4">
                <div className="avatar">
                  <div className="ring-primary/80 ring-offset-base-100 w-10 rounded-full ring-2 ring-offset-2">
                    <img src="#" alt={`Profile picture of `} />
                  </div>
                </div>
                <div className="bg-blue-100 p-3 rounded-l-full rounded-b-sm rounded-r-full max-w-[70%]">
                  <p className="text-gray-700">
                    I'm good, thanks! How about you?
                  </p>
                </div>
              </div>
            </div>  
            {/* Sender messages */}
            <div className=" justify-end flex">
              <div className=" flex flex-col items-start gap-2 mb-4">
                <div className="bg-gray-100  p-3 md:rounded-l-full md:rounded-br-sm md:rounded-r-full md:rounded-top-full max-w-xl">
                  <p className="text-gray-700">Hello, how are you? i hope you are doing great. yes we are all happy for your success and wishing you great life ahead</p>
                </div>
                <div className="flex items-center gap-2 text-gray-500">
                  <div className="avatar">
                    <div className="ring-primary/80 ring-offset-base-100 w-5 rounded-full ring-2 ring-offset-2">
                      <img src="#" alt={`Profile picture of `} />
                    </div>
                  </div>
                  <p>Today at 5:40 Am</p>
                </div>
              </div>
            </div>
            {/* Reciver Messages */}
            <div className="flex justify-start">
              <div className="flex items-start gap-4 mb-4">
                <div className="avatar">
                  <div className="ring-primary/80 ring-offset-base-100 w-10 rounded-full ring-2 ring-offset-2">
                    <img src="#" alt={`Profile picture of `} />
                  </div>
                </div>
                <div className="bg-blue-100 p-3 rounded-l-full rounded-b-sm rounded-r-full max-w-[70%]">
                  <p className="text-gray-700">
                    I'm good, thanks! How about you?
                  </p>
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
          <SendHorizontal
            size={34}
            className="text-gray-500 mt-2 ml-2 cursor-pointer"
          />
        </div>
      </section>
    </section>
  );
}

export default Chat;
