import React, { useState } from "react";
import SearchGroupChat from "../Search/SearchGroupChat";
import { LuPlus } from "react-icons/lu";
import ChatElement from "./ChatElement";

function Group() {
  const [openDialog, setOpenDialog] = useState(false);

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };
  return (
    <>
      <div>
        <div className=" h-[660px] w-[320px] shadow-lg">
          <div className="p-6">
            <div className="flex items-center text-xl font-semibold mb-6">
              Thảo luận nhóm
            </div>

            <div className="w-full mb-6">
              <SearchGroupChat />
            </div>

            <div className="flex items-center justify-between border-b-2 border-slate-300 pb-2 pr-6 font-semibold text-[#79B8B8] mt-8">
              <span>Tạo nhóm mới</span>
              <LuPlus />
            </div>

            <div className="mt-6">
              <div className="text-sm text-neutral-600 font-semibold">
                Tất cả đoạn chat
              </div>
              <div className="overflow-y-auto h-[408px] scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent pr-2">
              <ChatElement/>
              <ChatElement/>

            
              <ChatElement/>
              <ChatElement/>
              <ChatElement/>
              <ChatElement/>
              <ChatElement/>
              <ChatElement/>
              <ChatElement/>
              </div>
             

            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Group;
