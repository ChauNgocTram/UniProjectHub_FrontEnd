import React from "react";
import { FaRegBookmark } from "react-icons/fa6";
import { FiShare2 } from "react-icons/fi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { NavLink } from "react-router-dom";

const UserDropdownLinks = [
  {
    name: "Chỉnh sửa",
    // link: AGENT_PROFILE_PAGE,
  },
];

function CardProject() {
  return (
    <>
      <div className="relative flex w-full max-w-[20rem] flex-col rounded-xl bg-transparent bg-clip-border text-gray-700 shadow-none border-2 border-neutral-200 pt-4 px-4">
        <div className="flex justify-between border-b-2 border-neutral-200">
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
              <BsThreeDotsVertical className="transition-all duration-200 "/>
            </span>
            <div className="absolute -left-9 z-[9999] hidden rounded-md bg-white p-2 text-black group-hover:block shadow-md w-48 cursor-pointer">
                  <ul className="space-y-3">
                    {UserDropdownLinks.map((link) => (
                      <li key={link.name}>
                        <a
                          className="inline-block w-full rounded-md p-2 hover:bg-mainBg/20 text-center"
                          //  href={link.link}
                        >
                          {link.name}
                        </a>
                      </li>
                    ))}
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

        <div className="relative flex items-center gap-4 mx-0 my-4 overflow-hidden text-gray-700 bg-transparent shadow-none rounded-xl bg-clip-border">
          <img
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1480&amp;q=80"
            alt=""
            className="relative inline-block h-[58px] w-[58px] !rounded-full  object-cover object-center"
          />
          <div className="flex w-full flex-col gap-0.5">
            <NavLink>
              <h5 className="block text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                Tania Andrew
              </h5>
            </NavLink>

            <p className="block text-base antialiased font-light leading-relaxed text-blue-gray-900">
              Frontend Lead @ Google
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default CardProject;
