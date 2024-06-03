import React from "react";
import ProjectAvatar from "../ProjectAvatar";
import GroupChatAvatar from "./GroupChatAvatar";

const truncateText = (string, n) => {
  return string?.length > n ? `${string?.slice(0, n)}...` : string;
};

function ChatElement() {
  return (
    <>
      <div className="bg-slate-200 rounded-xl my-2 w-full ">
        <div className="flex items-center justify-between px-4 w-full">
          <div className="py-3 flex items-center">
           <GroupChatAvatar/>
            <div className="text-sm flex flex-col space-y-1">
              <p className="font-semibold ">APN Team</p>
              <span>{truncateText("xin chào", 20)}</span>
            </div>
          </div>

          <div className="flex flex-col items-center space-y-2 text-sm">
                <span className="">10:01</span>
                <span className=' flex items-center justify-center text-[12px] text-white font-semibold w-3 h-3 p-[9px] rounded-full bg-red-600'>
                5
              </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default ChatElement;
