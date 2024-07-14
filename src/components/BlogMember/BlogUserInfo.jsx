import React from "react";
import avtDefault from "../../assets/images/avtDefault.png";
import { PiShootingStarLight } from "react-icons/pi";

function BlogUserInfo() {
  return (
    <div className="bg-blueLevel1 w-[300px] py-6 flex h-full flex-col items-center justify-start">
      <img
        src={avtDefault}
        alt=""
        className="w-[100px] h-[100px] rounded-full"
      />
      <span className="font-bold text-xl text-[#2693B5] mt-3 mb-2">Lisa</span>
      <span className="text-tagMemberText bg-tagMemberBg py-1 px-2 rounded-lg font-semibold text-sm flex">
        <PiShootingStarLight size={20} className="font-bold mr-1" /> Thành viên{" "}
      </span>
    </div>
  );
}

export default BlogUserInfo;
