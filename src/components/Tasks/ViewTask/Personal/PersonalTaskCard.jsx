import clsx from "clsx";
import React, { useState } from "react";
import {
  MdAttachFile,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdKeyboardDoubleArrowUp,
} from "react-icons/md";
import { BGS, PRIOTITYSTYELS, formatDate } from "../../../../utils";
//import TaskDialog from "./task/TaskDialog";
import { BiMessageAltDetail } from "react-icons/bi";
import { FaList } from "react-icons/fa";
import { BiCalendar } from "react-icons/bi";
import { RxCounterClockwiseClock } from "react-icons/rx";
//import UserInfo from "./UserInfo";
import { IoMdAdd } from "react-icons/io";
import { NavLink } from "react-router-dom";
import { PERSONAL_TASK_DETAILS } from "../../../../routes/constant";
import TaskDialog from "../../../Dialog/TaskDialog";
import TaskStatusBadge from "../../../Status/TaskStatusBadge";
import FormattedDate from "../../../FormattedDate";
import { useSubTasksByTaskId } from "../../../../api/subTaskApi";
import { BsDot } from "react-icons/bs";
import AddSubTask from "../../ManageSubTask/AddSubTask";

const ICONS = {
  3: <MdKeyboardDoubleArrowUp />,
  2: <MdKeyboardArrowUp />,
  1: <MdKeyboardArrowDown />,
};

const getPriorityLabel = (rate) => {
  switch (rate) {
    case 1:
      return "Low";
    case 2:
      return "Medium";
    case 3:
      return "High";
    default:
      return "";
  }
};

function PersonalTaskCard({ task }) {
  const [open, setOpen] = useState(false);
  const { data: subTasks, isLoading, isError } = useSubTasksByTaskId(task.id);

  return (
    <>
      <div className="w-full h-fit bg-white shadow-md p-2 rounded">
        <div className="w-full flex justify-between items-center mb-2 px-3">
          <TaskStatusBadge taskStatus={task.status} />
          <TaskDialog task={task} />
        </div>

        <div
          className={clsx(
            "flex flex-1 gap-1 items-center text-xs font-medium px-2",
            PRIOTITYSTYELS[task.rate]
          )}
        >
          <span className="text-xs font-semibold">{ICONS[task.rate]}</span>
          <span className="uppercase">
            {getPriorityLabel(task.rate)} Priority
          </span>
        </div>

        <div className="flex items-center min-h-12 gap-2 my-1 px-2">
          <NavLink to={`/nhiem-vu/${PERSONAL_TASK_DETAILS.replace(":id", task.id)}`}>
            <h4 className="line-clamp-2 text-black font-medium">
              {task.taskName}
            </h4>
          </NavLink>
        </div>

        <div className="px-3">
          <div className="flex space-x-1 items-center text-gray-600 my-2">
            <BiCalendar />
            <span className="text-sm">
              <FormattedDate date={task.startDate} />
            </span>
          </div>
          <div className="flex space-x-1 items-center text-gray-600 mb-2">
            <RxCounterClockwiseClock />
            <span className="text-sm">
              <FormattedDate date={task.deadline} />
            </span>
          </div>
        </div>

        {/*  */}

        <div className="w-full border-t border-gray-200 my-2" />
        <div className="flex items-center justify-between mb-2 px-4">
          <div className="flex items-center gap-3">
            <div className="flex gap-1 items-center text-sm text-gray-600 ">
              <MdAttachFile />
              {/* <span>{task?.assets?.length}</span> */}
              <span>5</span>
            </div>

            <div className="flex gap-1 items-center text-sm text-gray-600 ">
              <FaList />
              {<span>{subTasks?.length}</span>}
            </div>
          </div>
        </div>

        {/* sub tasks */}
        {subTasks?.length > 0 ? (
          <div className="py-2 border-t border-gray-200">
            {subTasks.slice(0, 1).map((item) => (
              <div key={item.id} className="py-2 flex">
                <BsDot size={20} />
                <h5 className="text-sm line-clamp-1 text-textPrimary">
                  {item.description}
                </h5>
              </div>
            ))}
            {subTasks.length > 1 && (
              <NavLink
                to={`/du-an-nhom/${PERSONAL_TASK_DETAILS.replace(
                  ":id",
                  task.id
                )}`}
                className="text-blueLevel4 hover:text-blueLevel5 text-sm flex justify-center italic py-2"
              >
                Xem thêm...
              </NavLink>
            )}
          </div>
        ) : (
          <>
            <div className="py-4 border-t border-gray-200">
              <span className="text-gray-500">No Sub Task</span>
            </div>
          </>
        )}

        <div className="w-full pb-2">
          <button
            onClick={() => setOpen(true)}
            className="w-full flex gap-4 items-center text-sm text-gray-500 font-semibold disabled:cursor-not-allowed disabled::text-gray-300"
          >
            <IoMdAdd className="text-lg uppercase" />
            <span>THÊM VIỆC CẦN LÀM</span>
          </button>
        </div>
      </div>

      <AddSubTask open={open} setOpen={setOpen} id={task.id} />
    </>
  );
}

export default PersonalTaskCard;
