import clsx from "clsx";
import React, { useEffect, useState } from "react";
import {
  MdAttachFile,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdKeyboardDoubleArrowUp,
} from "react-icons/md";
//import { useSelector } from "react-redux";
import { BGS, PRIOTITYSTYELS, formatDate } from "../../../../utils";
//import TaskDialog from "./task/TaskDialog";
import { BiMessageAltDetail } from "react-icons/bi";
import { FaList } from "react-icons/fa";
import { BiCalendar } from "react-icons/bi";
import { RxCounterClockwiseClock } from "react-icons/rx";
//import UserInfo from "./UserInfo";
import { IoMdAdd } from "react-icons/io";
import UserInfo from "../../../UserInfo/UserInfo";
import { NavLink } from "react-router-dom";
import { TASK_DETAILS } from "../../../../routes/constant";
import AddSubTask from "../../ManageTask/AddSubTask";
import TaskDialog from "../../../Dialog/TaskDialog";
import TaskStatusBadge from "../../../Status/TaskStatusBadge";
import { format } from "date-fns";
import api from "../../../../config/axios";
import { BsDot } from "react-icons/bs";

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
  //const { user } = useSelector((state) => state.auth);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const subTaskId = task.id;

  const [subTask, setSubTask] = useState([])
  const [reloadContent, setReloadContent] = useState(false);
  const handleReloadContent = () => {
    setReloadContent((prev) => !prev);
  };


  //const [selectedStatus, setSelectedStatus] = useState(0);

  const getAllSubTaskByTaskId = async () => {
    try {
      const response = await api.get(`/api/SubTask/GetSubTasksByTaskId/${subTaskId}`);
      if (response.data && response.data.length > 0) {
        const formattedTasks = response.data.map((subtask) => ({
          ...subtask,
          created: format(new Date(subtask.created), "dd/MM/yyyy"),
          deadline: format(new Date(subtask.deadline), "dd/MM/yyyy"),
        }));
        setSubTask(formattedTasks); 
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching request:", error);
      setLoading(false);
    }
  };
  
  useEffect(() => {
    window.scrollTo(0, 0);
    getAllSubTaskByTaskId();
  }, [subTaskId, reloadContent]);

  return (
    <>
      <>
        <div className="w-full h-fit bg-white shadow-md p-2 rounded">
          <div className="w-full flex justify-between items-center mb-2 px-3">
            <TaskStatusBadge taskStatus={task.status} />
            {/* {user?.isAdmin && <TaskDialog task={task} />} */}
            <TaskDialog task={task} />
          </div>

          <div
            className={clsx(
              "flex flex-1 gap-1 items-center text-sm font-medium",
              PRIOTITYSTYELS[task.rate]
            )}
          >
            <span className="text-lg">{ICONS[task.rate]}</span>

            <span className="uppercase">
              {getPriorityLabel(task.rate)} Priority
            </span>
          </div>

          <>
            <div className="flex items-center gap-2 my-2">
              <div
              // className={clsx(
              //   "w-4 h-4 rounded-full",
              //   TASK_TYPE[task.status]
              // )}
              />
              <NavLink to={`/du-an-nhom/${TASK_DETAILS.replace(":id", task.id)}`}>
                <h4 className="line-clamp-2 text-black font-medium">
                  {task.taskName}
                </h4>
              </NavLink>
            </div>
            {/* <div className="flex space-x-2 items-center text-gray-600 my-2">
                <BiCalendar />
                <span className="text-sm ">
                 
                  23-05-2024
                </span>
              </div> */}
            <div className="px-3">
              <div className="flex space-x-2 items-center text-gray-600 mb-2">
                <RxCounterClockwiseClock />
                <span className="text-sm ">{task.deadline}</span>
              </div>

              <p className="text-sm text-gray-600 mt-1">
                Tạo bởi: Châu Ngọc Trâm
              </p>
            </div>
          </>

          <div className="w-full border-t border-gray-200 my-2" />
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              {/* <div className="flex gap-1 items-center text-sm text-gray-600">
              <BiMessageAltDetail />
               <span>{task?.activities?.length}</span>
              <span>8</span>
            </div> */}
              <div className="flex gap-1 items-center text-sm text-gray-600 ">
                <MdAttachFile />
                {/* <span>{task?.assets?.length}</span> */}
                <span>0</span>
              </div>
              <div className="flex gap-1 items-center text-sm text-gray-600 ">
                <FaList />
                <span>{subTask.length}</span>
                
              </div>
            </div>

            {/* <div className='flex flex-row-reverse'>
            {task?.team?.map((m, index) => (
              <div
                key={index}
                className={clsx(
                  "w-7 h-7 rounded-full text-white flex items-center justify-center text-sm -mr-1",
                  BGS[index % BGS?.length]
                )}
              >
                <UserInfo user={m} />
              </div>
            ))}
          </div> */}
          </div>

          {/* sub tasks */}
          {subTask.length > 0 && (
          <div className="py-2 border-t border-gray-200">
          {subTask.slice(0, 2).map((item) => (
            <div key={item.id} className="py-2 flex">
              <BsDot size={20} />
              <h5 className="text-sm line-clamp-1 text-textPrimary">{item.description}</h5>
            </div>
          ))}
          {subTask.length > 2 && (
            <NavLink to={`/du-an-nhom/${TASK_DETAILS.replace(":id", task.id)}`} className="text-blueLevel4 hover:text-blueLevel5 text-sm flex justify-center italic py-2">
              Xem thêm...
            </NavLink>
          )}
        </div>
        ) }
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

        <AddSubTask open={open} setOpen={setOpen} id={task.id} />
      </>
    </>
  );
};

export default TaskCard;
