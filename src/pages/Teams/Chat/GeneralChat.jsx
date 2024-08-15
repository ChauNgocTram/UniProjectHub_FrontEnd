import React, { useState }  from "react";
import TeamSidebar from "../../../components/Sidebar/TeamSidebar";
import Group from "../../../components/Chats/Group";
import Conversation from "../../../components/Chats/Conversation/Conversation";

function GeneralChat() {
  return (
    <>
      <div className="flex">
        <TeamSidebar />
        <div className="w-full flex">
          <Group />
          <Conversation/>
        </div>
      </div>
    </>
  );
}

export default GeneralChat;
