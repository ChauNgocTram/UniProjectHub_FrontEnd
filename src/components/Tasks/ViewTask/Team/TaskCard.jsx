import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import clsx from "clsx";
import {
  MdAttachFile,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdKeyboardDoubleArrowUp,
} from "react-icons/md";
import { BiMessageAltDetail, BiCalendar } from "react-icons/bi";
import { FaList } from "react-icons/fa";
import { RxCounterClockwiseClock } from "react-icons/rx";
import { IoMdAdd } from "react-icons/io";
import { FiUser } from "react-icons/fi";
import { useSubTasksByTaskId } from "../../../../api/subTaskApi";
import UserInfo from "../../../UserInfo/UserInfo";
import TaskDialog from "../../../Dialog/TaskDialog";
import AddSubTask from "../../ManageTask/AddSubTask";
import TaskStatusBadge from "../../../Status/TaskStatusBadge";
import FormattedDate from "../../../FormattedDate";
import { PRIOTITYSTYELS } from "../../../../utils";
import { TASK_DETAILS } from "../../../../routes/constant";
import { useUserById } from "../../../../api/userApi";

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

const TaskCard = ({ task }) => {
  const [open, setOpen] = useState(false);
  const { data: subTasks, isLoading, isError } = useSubTasksByTaskId(task.id);
  const { data: userDetail } = useUserById(task.ownerId);

  return (
    <>
      <div className="w-full h-fit bg-white shadow-md p-2 rounded">
        <div className="w-full flex justify-between items-center mb-2 px-3">
          <TaskStatusBadge taskStatus={task.status} />
          <TaskDialog task={task} />
        </div>

        <div
          className={clsx(
            "flex flex-1 gap-1 items-center text-sm font-medium px-2",
            PRIOTITYSTYELS[task.rate]
          )}
        >
          <span className="text-md font-semibold">{ICONS[task.rate]}</span>
          <span className="uppercase">
            {getPriorityLabel(task.rate)} Priority
          </span>
        </div>

        <div className="flex items-center min-h-12 gap-2 my-1 px-2">
          <NavLink to={`/du-an-nhom/${TASK_DETAILS.replace(":id", task.id)}`}>
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
          <div className="flex space-x-1 items-center text-gray-600 mb-2">
            <FiUser />
            <span className="text-sm">
              Tạo bởi:{" "}
              <span className="text-blueLevel5 font-medium italic">
                {userDetail?.userName}
              </span>
            </span>
          </div>
        </div>

        <div className="w-full border-t border-gray-200 my-2" />
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <div className="flex gap-1 items-center text-sm text-gray-600">
              <MdAttachFile />
              <span>0</span>
            </div>
            <div className="flex gap-1 items-center text-sm text-gray-600">
              <FaList />
              {<span>{subTasks?.length}</span>}
            </div>
          </div>
        </div>

        {/* {subTasks?.length > 0 && (
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
              <NavLink to={`/du-an-nhom/${TASK_DETAILS.replace(":id", task.id)}`} className="text-blueLevel4 hover:text-blueLevel5 text-sm flex justify-center italic py-2">
                Xem thêm...
              </NavLink>
            )}
          </div>
        )} */}
        <div className="w-full pb-2">
          <button
            onClick={() => setOpen(true)}
            className="w-full flex gap-4 items-center text-sm text-gray-500 font-semibold"
          >
            <IoMdAdd className="text-lg uppercase" />
            <span>THÊM VIỆC CẦN LÀM</span>
          </button>
        </div>
      </div>

      <AddSubTask open={open} setOpen={setOpen} id={task.id} />
    </>
  );
};

export default TaskCard;
