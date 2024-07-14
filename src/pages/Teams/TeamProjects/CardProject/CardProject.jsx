import React, { useEffect, useState } from "react";
import { FaRegBookmark } from "react-icons/fa6";
import { FiShare2 } from "react-icons/fi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { NavLink } from "react-router-dom";
import { PiClockCounterClockwiseFill } from "react-icons/pi";
import { ALL_TASK, EDIT_TEAM_PROJECT } from "../../../../routes/constant";
import ProjectAvatar from "../../../../components/ProjectAvatar";
import DeleteTeamProject from "../../ManageTeamProject/DeleteTeamProject";

function CardProject({project , onDelete, handleReloadContent}) {


  return (
    <>
    {project.map((item) => (
      <div key={item.id} className="relative flex w-full max-w-[20rem] flex-col rounded-xl bg-transparent bg-clip-border text-gray-700 shadow-lg border-2 border-neutral-200 pt-3 px-2">
        <div className="flex justify-between border-b-2 border-neutral-200 px-3">
          <div className="text-sm text-neutral-400">{item.createdAt}</div>
          <div className="flex items-center space-x-3 pb-3">
          <button >
                <FaRegBookmark />
              </button>
            <button>
              <FiShare2 />
            </button>
            <div className="group relative cursor-pointer ">
              <span>
                <BsThreeDotsVertical className="transition-all duration-200 " />
              </span>
              <div className="absolute -right-16 z-[9999] hidden rounded-md bg-white p-2 text-black group-hover:block shadow-md w-48 cursor-pointer">
                <ul className="space-y-3">
                  <li>
                    <NavLink
                      className="inline-block w-full rounded-md p-2 hover:bg-mainBg/20 text-center"
                      to={`/${EDIT_TEAM_PROJECT.replace(":id", item.id)}`}
                    >
                      Chỉnh sửa
                    </NavLink>
                  </li>

                  <li>
                    <DeleteTeamProject project={item} onDelete={onDelete} handleReloadContent={handleReloadContent}/>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="relative flex items-center gap-0 mx-0 mt-4 mb-2 overflow-hidden text-gray-700 bg-transparent shadow-none rounded-xl bg-clip-border">
          <ProjectAvatar cardName={item}/>
          <div className="flex w-full flex-col gap-0.5 pr-3">
            <NavLink to={`/du-an-nhom/${ALL_TASK.replace(":id", item.id)}`}>
              <h5 className="line-clamp-1 text-xl antialiased font-semibold leading-snug tracking-normal text-blueLevel5 hover:text-blueLevel4">
                {item.name}
              </h5>
            </NavLink>

            <p className="block text-base antialiased font-light leading-relaxed text-blue-gray-900">
            {item.nameLeader}
            </p>
          </div>
        </div>

        <div className="px-3 line-clamp-1 text-sm mb-2 italic">
        {item.description}
        </div>

        <div className="pb-2 px-2 flex justify-end items-center italic space-x-1">
          <PiClockCounterClockwiseFill />
          <p className="block text-sm antialiased font-medium leading-relaxed text-blue-gray-900">
            Cập nhật lần cuối:
          </p>
        </div>
      </div>
        ))}
    </>
  );
}

export default CardProject;
