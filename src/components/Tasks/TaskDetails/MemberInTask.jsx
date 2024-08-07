import React, { useState } from "react";
import { getInitials } from "../../../utils";
import MemberTaskDialog from "../../Dialog/MemberTaskDialog";
import { IoMdAddCircle } from "react-icons/io";
import AddMemberTask from "../ManageMemberInTask/AddMemberTask";
import { useUserById } from "../../../api/userApi";

const MemberInTask = ({ members = [] }) => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="py-2">
      <div className="flex gap-4 items-center">
        <p className="text-gray-500 font-semibold text-sm">
          NGƯỜI PHỤ TRÁCH {members?.length > 0 && <>{`(${members?.length})`}</>}
        </p>
        <IoMdAddCircle
          size={25}
          color="#1B4769"
          className="cursor-pointer"
          onClick={() => setOpenModal(true)}
        />
      </div>

      <div className="space-y-3 overflow-y-auto h-[220px] scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent">
        {members?.map((member) => {
          const { data: userDetail } = useUserById(member.memberId);

        

          return (
            <div
              key={member.id}
              className="flex py-2 items-center justify-between px-6 border-t border-gray-200"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full text-white flex items-center justify-center text-sm -mr-1 bg-blue-600">
                  <span className="text-center">
                    {getInitials(userDetail?.userName)}
                  </span>
                </div>

                <div>
                  <p className="text-lg font-semibold">
                    {userDetail?.userName}
                  </p>
                  <span className="text-gray-500">{userDetail?.email}</span>
                </div>
              </div>
              <MemberTaskDialog memberTask={member.id} />
            </div>
          );
        })}
      </div>

      <AddMemberTask open={openModal} setOpen={setOpenModal} />
    </div>
  );
};

export default MemberInTask;
