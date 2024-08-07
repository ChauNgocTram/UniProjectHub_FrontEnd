import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { FaTasks } from "react-icons/fa";
import {
  MdAttachFile,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdKeyboardDoubleArrowUp,
  MdCalendarMonth,
} from "react-icons/md";
import TabsFilter from "../../../../../components/Tabs/TabsFilter";
import {
  PRIOTITYSTYELS,
  TASK_TYPE,
  bgColor,
  getInitials,
} from "../../../../../utils";
import Button from "../../../../../components/Button";
import { IoMdAdd } from "react-icons/io";
import AddSubTask from "../../../../../components/Tasks/ManageSubTask/AddSubTask";
import ManageFile from "./ManageFile";
import CommonHeader from "../../../../../components/Header/CommonHeader";
import { useTaskById } from "../../../../../api/taskApi";
import { useSubTasksByTaskId } from "../../../../../api/subTaskApi";
import FormattedDate from "../../../../../components/FormattedDate";
import Loading from "../../../../../components/Loading/Loading";
import AllSubTask from "../../../../../components/Tasks/TaskDetails/AllSubTask";
import { useMemberByTaskId } from "../../../../../api/memberInTaskApi";
import MemberInTask from "../../../../../components/Tasks/TaskDetails/MemberInTask";
import clsx from "clsx";
import { RxCounterClockwiseClock } from "react-icons/rx";

const ICONS = {
  3: <MdKeyboardDoubleArrowUp />,
  2: <MdKeyboardArrowUp />,
  1: <MdKeyboardArrowDown />,
};

const TABS = [
  { title: "Chi tiết nhiệm vụ", icon: <FaTasks /> },
  { title: "File", icon: <MdAttachFile /> },
];

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

const getStatusLabel = (status) => {
  switch (status) {
    case 1:
      return "To do";
    case 2:
      return "In Progress";
    case 3:
      return "Completed";
    default:
      return "Pending";
  }
};

const TaskDetails = () => {
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(0);

  const { data: taskDetail, isLoading: isLoadingTask } = useTaskById(id);
  const { data: subTask, isLoading: isLoadingSub } = useSubTasksByTaskId(id);
  const { data: members, isLoading: isLoadingMembers } = useMemberByTaskId(id);

  if (isLoadingTask || isLoadingSub || isLoadingMembers) {
    return <Loading loading={true} />;
  }

  return (
    <>
      <div className="flex-1 overflow-y-auto sticky top-0">
        <CommonHeader />
        <div className="p-4 2xl:px-10">
          <div className="w-full flex flex-col gap-3 mb-4 overflow-y-hidden">
            <div className="flex items-center justify-between mb-1 mx-4">
              <div className="flex flex-col">
                <h1 className="text-2xl text-gray-600 font-bold">
                  {taskDetail?.taskName}
                </h1>
              </div>

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
                  <div className="w-full flex flex-col md:flex-row gap-5 2xl:gap-8 border-slate-200 border-2 rounded-xl shadow-xl px-8 py-6 mt-1 overflow-y-auto">
                    {/* LEFT */}
                    <div className="w-full md:w-1/2">
                      <div className="flex items-center gap-5 space-x-4">
                        <div
                          className={clsx(
                            "flex gap-1 items-center text-base font-semibold px-3 py-1 rounded-full",
                            PRIOTITYSTYELS[taskDetail?.rate],
                            bgColor[taskDetail?.rate]
                          )}
                        >
                          <span className="text-base">
                            {ICONS[taskDetail?.rate]}
                          </span>
                          <span className="uppercase">
                            {getPriorityLabel(taskDetail?.rate)} Priority
                          </span>
                        </div>

                        <div className={clsx("flex items-center gap-2")}>
                          <div
                            className={clsx(
                              "w-4 h-4 rounded-full",
                              TASK_TYPE[taskDetail?.status]
                            )}
                          />
                          <span className="text-black uppercase">
                            {getStatusLabel(taskDetail?.status)}
                          </span>
                        </div>
                      </div>

                      <div className="flex gap-2 items-center pt-4">
                        <MdCalendarMonth className="text-blueLevel5" />
                        <p className="text-textPrimary font-medium">
                          Ngày bắt đầu:{" "}
                          <FormattedDate date={taskDetail?.startDate} />
                        </p>
                      </div>

                      <div className="flex gap-2 items-center pt-4">
                        <RxCounterClockwiseClock className="text-blueLevel5" />
                        <p className="text-textPrimary font-medium">
                          Ngày hết hạn:{" "}
                          <FormattedDate date={taskDetail?.deadline} />
                        </p>
                      </div>

                      <div className="flex items-center gap-8 p-4 border-y border-gray-200">
                        <div className="space-x-2">
                          <span className="font-semibold">File :</span>
                          <span>0</span>
                        </div>

                        <span className="text-gray-400">|</span>

                        <div className="space-x-2">
                          <span className="font-semibold">Việc cần làm:</span>
                          <span>{subTask?.length}</span>
                        </div>
                      </div>

                      <MemberInTask members={members} /> 
                    </div>

                    {/* RIGHT */}
                    <AllSubTask subTask={subTask} />
                  </div>
                </>
              )}
              {selected === 1 && <ManageFile taskId={id}/>}
            </TabsFilter>
            <AddSubTask open={open} setOpen={setOpen} taskId={id} />
          </div>
        </div>
      </div>
    </>
  );
};

export default TaskDetails;
