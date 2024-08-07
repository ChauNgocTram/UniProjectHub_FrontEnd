import React from "react";

import userDefault from "../../assets/images/userDefault.png";
import { PiShootingStarLight } from "react-icons/pi";
import UserSidebar from "../../components/Sidebar/UserSidebar";
import { useParams } from "react-router-dom";
import AccountSetting from "../../components/ManageProfile/AccountSetting";
import ChangePassword from "../../components/ManageProfile/ChangePassword";
import { PROFILE } from "../../routes/constant";
import { useUserById } from "../../api/userApi";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/features/userSlice";

function Profile() {
  const { activepage } = useParams();
  const user = useSelector(selectUser);
  const { data: userDetail } = useUserById(user.userId);

  return (
    <>
      <div className="wrapper-body">
        <div className="rounded-xl shadow-md mb-12 pb-10">
          <div className="h-[320px] relative">
            <img
              className="w-full h-[250px] object-cover"
              src="https://images.unsplash.com/photo-1515338580809-319aaaae76fd?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
            />

            <img
              className="w-[150px] h-[150px] rounded-full object-cover absolute left-0 right-0 m-auto top-[150px] border-solid border-[3px] border-white"
              src="https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-portrait-176256935.jpg"
              alt=""
            />
          </div>

          <div className="flex flex-col items-center justify-center">
            <div className="flex items-center space-x-2">
              <h4 className="text-24 font-semibold">
                {userDetail?.lastName && userDetail?.firstName
                  ? `${userDetail.lastName} ${userDetail.firstName}`
                  : <span className="text-red-700 italic">Chưa có thông tin</span>}
              </h4>
              <span className="text-tagMemberText bg-tagMemberBg py-1 px-2 rounded-lg font-semibold text-sm flex">
                <PiShootingStarLight size={20} className="font-bold mr-1" />{" "}
                Thành viên{" "}
              </span>
            </div>

          </div>
        </div>

        <div className="userprofilein flex w-full justify-center gap-6 pb-6 mb-6">
          <div className="left w-1/5 border border-solid  border-slate-200 rounded-md min-h-[50vh]">
            <UserSidebar activepage={activepage} />
          </div>

          <div className="right w-[80%] border border-solid border-slate-200 rounded-md shadow-lg min-h-[50vh]">
            {activepage === "thong-tin-ca-nhan" && <AccountSetting userInfo={userDetail}/>}
            {activepage === "thay-doi-mat-khau" && <ChangePassword />}
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
