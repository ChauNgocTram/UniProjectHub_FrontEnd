import clsx from "clsx";
import moment from "moment";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { FaTasks } from "react-icons/fa";

import {
  MdAttachFile,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdKeyboardDoubleArrowUp,
  MdOutlineDoneAll,
  MdOutlineInsertComment,
  MdOutlineMessage,
  MdTaskAlt,
} from "react-icons/md";
//import { toast } from "sonner";
import TabsFilter from "../../../../../components/Tabs/TabsFilter";
import { PRIOTITYSTYELS, TASK_TYPE, getInitials } from "../../../../../utils";
//import Loading from "../components/Loader";
import Button from "../../../../../components/Button";
import { IoMdAdd } from "react-icons/io";
import AddSubTask from "../../../../../components/Tasks/ManageTask/AddSubTask";

import Activities from "./Activities";
import UploadFile from "../../../../../components/FileUpload/UploadFile";
import FileUpload from "../../../../../components/FileUpload/FileUpload";
import ManageFile from "./ManageFile";

const ICONS = {
  high: <MdKeyboardDoubleArrowUp />,
  medium: <MdKeyboardArrowUp />,
  low: <MdKeyboardArrowDown />,
};

// const bgColor = {
//   high: "bg-red-200",
//   medium: "bg-yellow-200",
//   low: "bg-blue-200",
// };

const TABS = [
  { title: "Chi tiết nhiệm vụ ", icon: <FaTasks /> },
  { title: "Bình luận", icon: <MdOutlineInsertComment /> },
  { title: "File", icon: <MdAttachFile /> },
];

const TASKTYPEICON = {
  commented: (
    <div className="w-10 h-10 rounded-full bg-gray-500 flex items-center justify-center text-white">
      <MdOutlineMessage />,
    </div>
  ),
};

const TaskDetails = () => {
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(0);
  // const task = tasks[3];

  return (
    <div className="w-full flex flex-col gap-3 mb-4 overflow-y-hidden ">
      {/* <h1 className='text-2xl text-gray-600 font-bold'>{task?.title}</h1> */}

      <div className="flex items-center justify-between mb-4 mx-4 ">
        <h1 className="text-2xl text-gray-600 font-bold">
          Xây dựng Master plan
          
        </h1>

        <Button
          onClick={() => setOpen(true)}
          label="Thêm việc cần làm"
          icon={<IoMdAdd className="text-lg" />}
          className="flex flex-row-reverse gap-1 items-center bg-mainColor font-semibold text-white rounded-md py-2 2xl:py-2.5"
        />
        
      </div>

      <TabsFilter tabs={TABS} setSelected={setSelected}>
        {selected === 0 && (
          <>
            <div className="w-full flex flex-col md:flex-row gap-5 2xl:gap-8 border-slate-200 border-2 rounded-xl shadow-xl p-8 mt-3 overflow-y-auto">
              {/* LEFT */}
              <div className="w-full md:w-1/2 space-y-4">
                <div className="flex items-center gap-5">
                  <div
                    // className={clsx(
                    //   "flex gap-1 items-center text-base font-semibold px-3 py-1 rounded-full",
                    //   PRIOTITYSTYELS[task?.priority],
                    //   bgColor[task?.priority]
                    // )}
                    className="flex gap-1 items-center text-base font-semibold px-3 py-1 rounded-full"
                  >
                    {/* <span className='text-lg'>{ICONS[task?.priority]}</span>
                    <span className='uppercase'>{task?.priority} Priority</span> */}
                    <span className="text-lg">
                      <MdKeyboardDoubleArrowUp />
                    </span>
                    <span className="uppercase">High Priority</span>
                  </div>

                  <div className={clsx("flex items-center gap-2")}>
                    <div
                      // className={clsx(
                      //   "w-4 h-4 rounded-full",
                      //   TASK_TYPE[task.stage]
                      // )}
                      className="w-4 h-4 rounded-full"
                    />
                    {/* <span className='text-black uppercase'>{task?.stage}</span> */}
                    <span className="text-black uppercase">TO DO</span>
                  </div>
                </div>

                {/* <p className='text-gray-500'>
                  Created At: {new Date(task?.date).toDateString()}
                </p> */}
                <p className="text-gray-500">Ngày tạo: 23-05-2024</p>
                <p className="text-gray-500">Deadline: 28-05-2024</p>

                <div className="flex items-center gap-8 p-4 border-y border-gray-200">
                  <div className="space-x-2">
                    <span className="font-semibold">File :</span>
                    {/* <span>{task?.assets?.length}</span> */}
                    <span>5</span>
                  </div>

                  <span className="text-gray-400">|</span>

                  <div className="space-x-2">
                    <span className="font-semibold">
                      Việc cần làm:
                    </span>
                    {/* <span>{task?.subTasks?.length}</span> */}
                    <span>5</span>
                  </div>
                </div>

                <div className="space-y-4 py-6">
                  <p className="text-gray-500 font-semibold text-sm">
                    NGƯỜI PHỤ TRÁCH
                  </p>
                  <div className="space-y-3">
                    {/* {task?.team?.map((m, index) => ( */}
                    <div
                      // key={index}
                      className="flex gap-4 py-2 items-center border-t border-gray-200"
                    >
                      <div
                        className={
                          "w-10 h-10 rounded-full text-white flex items-center justify-center text-sm -mr-1 bg-blue-600"
                        }
                      >
                        <span className="text-center">
                          {/* {getInitials(m?.name)} */} CH
                        </span>
                      </div>

                      <div>
                        {/* <p className='text-lg font-semibold'>{m?.name}</p>
                          <span className='text-gray-500'>{m?.title}</span> */}
                        <p className="text-lg font-semibold">Chau Ngoc Tram</p>
                        <span className="text-gray-500">
                          Front-end Developer
                        </span>
                      </div>
                    </div>
                    {/* ))} */}
                  </div>
                </div>
              </div>
              {/* RIGHT */}

              <div className="w-full md:w-1/2 space-y-8">
                <div className="space-y-4 py-6">
                  <p className="text-gray-600 font-semibold text-lg">
                    VIỆC CẦN LÀM
                  </p>
                  <div className="space-y-8">
                    {/* {task?.subTasks?.map((el, index) => ( */}
                    <div
                      // key={index}
                      className="flex gap-3"
                    >
                      <div className="w-10 h-10 flex items-center justify-center rounded-full bg-violet-50-200">
                        <MdTaskAlt className="text-violet-600" size={26} />
                      </div>

                      <div className="space-y-1">
                        <div className="flex gap-2 items-center">
                          {/* <span className='text-sm text-gray-500'>
                              {new Date(el?.date).toDateString()}
                            </span> */}
                          <span className="text-sm text-gray-500">
                            24-05-2024
                          </span>

                          {/* <span className='px-2 py-0.5 text-center text-sm rounded-full bg-violet-100 text-violet-700 font-semibold'>
                              {el?.tag}
                            </span> */}
                          <span className="px-2 py-0.5 text-center text-sm rounded-full bg-violet-100 text-violet-700 font-semibold">
                            tag
                          </span>
                        </div>

                        {/* <p className='text-gray-700'>{el?.title}</p> */}
                        <p className="text-gray-700">title</p>
                      </div>
                    </div>
                    {/* ))} */}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
        {selected === 1 && <Activities /> }
        {selected === 2 && <ManageFile/>}
        
      </TabsFilter>
      <AddSubTask open={open} setOpen={setOpen} />
    
    </div>
  );
};
export default TaskDetails;
