import React, { useState }  from "react";
import avtDefault from "../../assets/images/avtDefault.png";
import { PiShootingStarLight } from "react-icons/pi";
import { useUserById } from "../../api/userApi";
import { FaRegAddressCard } from "react-icons/fa";
import { CiMail } from "react-icons/ci";

function BlogUserInfo({blog}) {

  const { data: userDetail } = useUserById(blog.ownerId);
  return (
    <div className="bg-blueLevel1 w-[300px] py-6 flex h-full flex-col items-center justify-start">
      <img
        src={avtDefault}
        alt=""
        className="w-[100px] h-[100px] rounded-full"
      />
      <span className="font-bold text-xl text-[#2693B5] mt-3 mb-2">{userDetail?.userName}</span>
      <span className="flex items-center gap-1 font-medium text-xs text-blueLevel5 mb-2"><CiMail size={15}/>{userDetail?.email}</span>
      <span className="text-tagMemberText bg-tagMemberBg py-1 px-2 rounded-lg font-semibold text-sm flex mt-3">
        <PiShootingStarLight size={20} className="font-bold mr-1" /> Thành viên{" "}
      </span>
    </div>
  );
}

export default BlogUserInfo;
