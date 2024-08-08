import React, { useState } from "react";
import PropTypes from 'prop-types';
import { getInitials } from "../../../utils";
import MemberTaskDialog from "../../Dialog/MemberTaskDialog";
import { IoMdAddCircle } from "react-icons/io";
import AddMemberTask from "../ManageMemberInTask/AddMemberTask";
import { useUserById } from "../../../api/userApi";

const MemberInTask = ({ members }) => {
  const [openModal, setOpenModal] = useState(false);

  const safeMembers = Array.isArray(members) ? members : [];

  return (
    <div className="py-2">
      <div className="flex gap-4 items-center">
        <p className="text-gray-500 font-semibold text-sm">
          NGƯỜI PHỤ TRÁCH {safeMembers.length > 0 && `(${safeMembers.length})`}
        </p>
        <IoMdAddCircle
          size={25}
          color="#1B4769"
          className="cursor-pointer"
          onClick={() => setOpenModal(true)}
        />
      </div>

      <div className="space-y-3 overflow-y-auto h-[220px] scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent">
        {safeMembers.map((member) => {
          const { data: userDetail, isLoading, error } = useUserById(member.memberId);

          if (isLoading) return <p>Loading...</p>;
          if (error) return <p>Error loading user details.</p>;
          if (!userDetail) return <p>User details not available.</p>;

          return (
            <div
              key={member.id}
              className="flex py-2 items-center justify-between px-6 border-t border-gray-200"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full text-white flex items-center justify-center text-sm -mr-1 bg-blue-600">
                  <span className="text-center">
                    {getInitials(userDetail.userName)}
                  </span>
                </div>

                <div>
                  <p className="text-lg font-semibold">
                    {userDetail.userName}
                  </p>
                  <span className="text-gray-500">{userDetail.email}</span>
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

// PropTypes validation
MemberInTask.propTypes = {
  members: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      memberId: PropTypes.string.isRequired,
    })
  ),
};

export default MemberInTask;
