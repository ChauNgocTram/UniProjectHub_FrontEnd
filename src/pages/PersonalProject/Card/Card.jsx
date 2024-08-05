import React from "react";
import { BsTags, BsThreeDotsVertical } from "react-icons/bs";
import { NavLink } from "react-router-dom";
import { LuBadgeInfo } from "react-icons/lu";
import ProjectAvatar from "../../../components/ProjectAvatar";
import {
  ALL_PERSONAL_TASK,
  EDIT_PERSONAL_PROJECT,
} from "../../../routes/constant";
import DeleteTeamProject from "../../Teams/ManageTeamProject/DeleteTeamProject";
import FormattedDate from "../../../components/FormattedDate";

function Card({ project, onDelete }) {
  return (
    <>
      {project.map((item) => (
        <div
          key={item.id}
          className="relative flex w-full max-w-[20rem] flex-col rounded-xl bg-transparent bg-clip-border text-gray-700 shadow-none border-2 border-neutral-200 pt-3 px-2"
        >
          <div className="flex justify-between border-b-2 border-neutral-200 px-3">
            <div className="text-sm text-neutral-400">
              {" "}
              <FormattedDate date={item.createdAt} />
            </div>
            <div className="flex items-center space-x-3 pb-3">
              <div className="group relative cursor-pointer">
                <span>
                  <BsThreeDotsVertical className="transition-all duration-200 " />
                </span>
                <div className="absolute -left-9 z-[9999] hidden rounded-md bg-white p-2 text-black group-hover:block shadow-md w-48 cursor-pointer">
                  <ul className="space-y-3">
                    <li>
                      <NavLink
                        className="inline-block w-full rounded-md p-2 hover:bg-mainBg/20 text-center"
                        to={`/${EDIT_PERSONAL_PROJECT.replace(
                          ":id",
                          project.id
                        )}`}
                      >
                        Chỉnh sửa
                      </NavLink>
                    </li>
                    <li>
                      <DeleteTeamProject
                        project={project}
                        onDelete={onDelete}
                      />
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="relative flex  gap-0 mx-0 mt-4 mb-1 min-h-20 overflow-hidden text-gray-700 bg-transparent shadow-none rounded-xl bg-clip-border">
            <div className="flex w-full flex-col gap-0.5 pr-3">
              <div className="flex items-center ">
                <ProjectAvatar cardName={item} />
                <NavLink
                  to={`/du-an-ca-nhan/${ALL_PERSONAL_TASK.replace(
                    ":id",
                    item.id
                  )}`}
                >
                  <h5 className="line-clamp-2 text-lg antialiased font-semibold leading-snug tracking-normal text-blueLevel5 hover:text-blueLevel4">
                    {item.name}
                  </h5>
                </NavLink>
              </div>

              <div className="flex flex-col px-3 py-2 gap-1">
                <p className="text-sm flex items-center font-light text-blue-gray-900">
                  <BsTags size={15} className="mr-1" />
                  Danh mục:{" "}
                  <span className="font-medium ml-2">
                    {item.typeOfSpace}
                  </span>{" "}
                </p>

                <p className="flex items-center text-sm antialiased font-light leading-relaxed text-blue-gray-900">
                  <LuBadgeInfo size={15} className="mr-1" />
                  Mô tả:{" "}
                  <span className="font-medium ml-2">{item.description}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default Card;
