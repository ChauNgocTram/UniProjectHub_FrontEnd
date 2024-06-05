import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaRegBookmark } from "react-icons/fa6";
import { FiShare2 } from "react-icons/fi";
import { NavLink } from "react-router-dom";
import { PiClockCounterClockwiseFill } from "react-icons/pi";
import { LuListTodo } from "react-icons/lu";
import { GiSandsOfTime } from "react-icons/gi";
import ProjectAvatar from "../../../components/ProjectAvatar";
import { EDIT_PERSONAL_PROJECT } from "../../../routes/constant";

function Card() {
  return (
    <>
      <div className="relative flex w-full max-w-[20rem] flex-col rounded-xl bg-transparent bg-clip-border text-gray-700 shadow-none border-2 border-neutral-200 pt-3 px-2">
        <div className="flex justify-between border-b-2 border-neutral-200 px-3">
          <div className="text-sm text-neutral-400">19/05/2024</div>
          <div className="flex items-center space-x-3 pb-3">
            <button>
              <FaRegBookmark />
            </button>
            <button>
              <FiShare2 />
            </button>
            <div className="group relative cursor-pointer ">
              <span>
                <BsThreeDotsVertical className="transition-all duration-200 " />
              </span>
              <div className="absolute -left-9 z-[9999] hidden rounded-md bg-white p-2 text-black group-hover:block shadow-md w-48 cursor-pointer">
                <ul className="space-y-3">
                  <li>
                    <NavLink
                      className="inline-block w-full rounded-md p-2 hover:bg-mainBg/20 text-center"
                      to={`/${EDIT_PERSONAL_PROJECT}`}
                    >
                      Chỉnh sửa
                    </NavLink>
                  </li>

                  <li>
                    <button
                      // onClick={logout}
                      className="font-semibold inline-block w-full rounded-md py-2 hover:bg-mainBg/20 text-red-500"
                    >
                      Xoá dự án
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="relative flex items-center gap-0 mx-0 my-4 overflow-hidden text-gray-700 bg-transparent shadow-none rounded-xl bg-clip-border">
          {/* <img
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1480&amp;q=80"
            alt=""
            className="relative inline-block h-[58px] w-[58px] !rounded-full  object-cover object-center"
          /> */}
          <ProjectAvatar />
          <div className="flex w-full flex-col gap-0.5 pr-3">
            <NavLink>
              <h5 className="line-clamp-2 text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                Mini Project fbwjfuihfdljNWO BFUweahnli huweihlcuh
              </h5>
            </NavLink>
            <div className="mt-2">
              <p className="flex items-center text-sm antialiased font-normal leading-relaxed text-blue-gray-900">
                <LuListTodo className="mr-1" />
                To do:{" "}
                <span className="font-semibold ml-1 text-red-400">10</span>
              </p>
              <p className="flex items-center text-sm antialiased font-normal leading-relaxed text-blue-gray-900">
                <GiSandsOfTime className="mr-1" /> In progress:{" "}
                <span className="font-semibold ml-1 text-blue-500">8</span>
              </p>
            </div>
          </div>
        </div>

        <div className="pb-4 flex justify-end items-center italic space-x-1">
          <PiClockCounterClockwiseFill />
          <p className="block text-sm antialiased font-medium leading-relaxed text-blue-gray-900">
            Cập nhật lần cuối: 9 giờ trước
          </p>
        </div>
      </div>
    </>
  );
}

export default Card;
