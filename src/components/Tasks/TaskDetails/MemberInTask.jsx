import React from "react";
import { useUserById } from "../../../api/userApi";
import { getInitials } from "../../../utils";

const MemberInTask = ({ members }) => {
    return (
        <div className="space-y-4 py-6">
          <p className="text-gray-500 font-semibold text-sm">NGƯỜI PHỤ TRÁCH ({members?.length})</p>
          <div className="space-y-3">
            {members?.map((member) => {
              const { data: userDetail } = useUserById(member.memberId);
    
              return (
                <div key={member.id} className="flex gap-4 py-2 items-center border-t border-gray-200">
                  <div
                    className="w-10 h-10 rounded-full text-white flex items-center justify-center text-sm -mr-1 bg-blue-600"
                  >
                    <span className="text-center">{getInitials(userDetail?.userName)}</span>
                  </div>
    
                  <div>
                    <p className="text-lg font-semibold">{userDetail?.userName}</p>
                    <span className="text-gray-500">{userDetail?.email}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      );
}

export default MemberInTask