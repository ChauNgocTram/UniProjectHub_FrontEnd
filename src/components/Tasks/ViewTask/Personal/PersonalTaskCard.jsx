import clsx from "clsx";
import React, { useState } from "react";
import {
  MdAttachFile,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdKeyboardDoubleArrowUp,
} from "react-icons/md";
//import { useSelector } from "react-redux";
import { BGS, PRIOTITYSTYELS, TASK_TYPE, formatDate } from "../../../../utils";
//import TaskDialog from "./task/TaskDialog";
import { BiMessageAltDetail } from "react-icons/bi";
import { FaList } from "react-icons/fa";
import { BiCalendar } from "react-icons/bi";
import { RxCounterClockwiseClock } from "react-icons/rx";
//import UserInfo from "./UserInfo";
import { IoMdAdd } from "react-icons/io";
import { NavLink } from "react-router-dom";
import { PERSONAL_TASK_DETAILS } from "../../../../routes/constant";
import AddSubTask from "../../ManageTask/AddSubTask";
import TaskDialog from "../../../Dialog/TaskDialog";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";

const ICONS = {
  high: <MdKeyboardDoubleArrowUp />,
  medium: <MdKeyboardArrowUp />,
  low: <MdKeyboardArrowDown />,
};

function PersonalTaskCard({ task }) {
  //const { user } = useSelector((state) => state.auth);
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="w-full h-fit bg-white shadow-md py-2 px-4 rounded">
        <div className="w-full flex justify-between items-center">
          <div
            className="flex flex-1 gap-1 items-center text-sm font-medium"
            // className={clsx(
            //   "flex flex-1 gap-1 items-center text-sm font-medium",
            //   PRIOTITYSTYELS[task?.priority]
            // )}
          >
            <span className="text-lg">
              {/* {ICONS[task?.priority]} */}
              <MdKeyboardDoubleArrowUp />
            </span>

            {/* <span className='uppercase'>{task?.priority} Priority</span> */}
            <span className="uppercase">High Priority</span>
          </div>

          {/* {user?.isAdmin && <TaskDialog task={task} />} */}
          <TaskDialog task={task} />
        </div>

        <>
          <div className="flex items-center gap-2 my-2">
            <div
              className="w-4 h-4 rounded-full"
              // className={clsx("w-4 h-4 rounded-full", TASK_TYPE[task.stage])}
            />
            <NavLink to={`/du-an-ca-nhan/${PERSONAL_TASK_DETAILS}`}>
              <h4 className="line-clamp-2 text-black font-medium">
                {/* {task?.title} */}
                Lên kế hoạch truyền thông marketing tích hợp
              </h4>
            </NavLink>
          </div>
          <div className="flex justify-between items-center px-4">
            <div className="flex  space-x-2 items-center text-gray-600 my-2">
              <BiCalendar />
              <span className="text-sm ">
                {/* {formatDate(new Date(task?.date))} */}
                23-05-2024
              </span>
            </div>
            <div>
              <MdOutlineKeyboardDoubleArrowRight />
            </div>
            <div className="flex space-x-2 items-center text-gray-600 my-2">
              <RxCounterClockwiseClock />
              <span className="text-sm ">
                {/* {formatDate(new Date(task?.date))} */}
                28-05-2024
              </span>
            </div>
          </div>
        </>

        <div className="w-full border-t border-gray-200 my-2" />
        <div className="flex items-center justify-between mb-2 px-4">
          <div className="flex items-center gap-3">
            {/* <div className="flex gap-1 items-center text-sm text-gray-600">
            <BiMessageAltDetail />
             <span>{task?.activities?.length}</span>
            <span>8</span>
          </div> */}
            <div className="flex gap-1 items-center text-sm text-gray-600 ">
              <MdAttachFile />
              {/* <span>{task?.assets?.length}</span> */}
              <span>5</span>
            </div>
            <div className="flex gap-1 items-center text-sm text-gray-600 ">
              <FaList />
              {/* <span>0/{task?.subTasks?.length}</span> */}
              <span>1</span>
            </div>
          </div>

          <div className="text-[10px] bg-red-200 text-red-600 font-bold rounded-lg flex items-center justify-center px-2 py-1">
            TO DO
          </div>
        </div>

        {/* sub tasks */}
        {task?.subTasks?.length > 0 ? (
          <div className="py-4 border-t border-gray-200">
            <h5 className="text-base line-clamp-1 text-black">
              {task?.subTasks[0].title}
            </h5>

            <div className="p-4 space-x-8">
              <span className="text-sm text-gray-600">
                {formatDate(new Date(task?.subTasks[0]?.date))}
              </span>
              <span className="bg-blue-600/10 px-3 py-1 rounded0full text-blue-700 font-medium">
                {task?.subTasks[0].tag}
              </span>
            </div>
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
            // disabled={user.isAdmin ? false : true}
            className="w-full flex gap-4 items-center text-sm text-gray-500 font-semibold disabled:cursor-not-allowed disabled::text-gray-300"
          >
            <IoMdAdd className="text-lg uppercase" />
            <span>THÊM VIỆC CẦN LÀM</span>
          </button>
        </div>
      </div>

      <AddSubTask
        open={open}
        setOpen={setOpen}
        //  id={task._id}
      />
    </>
  );
}

export default PersonalTaskCard;
