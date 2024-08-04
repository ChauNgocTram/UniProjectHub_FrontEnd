import React, { useState } from "react";
import { BiMessageAltDetail } from "react-icons/bi";
import {
  MdAttachFile,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdKeyboardDoubleArrowUp,
} from "react-icons/md";
import { toast } from "sonner";
import { BGS, PRIOTITYSTYELS, formatDate } from "../../../../utils";
import clsx from "clsx";
import { FaList } from "react-icons/fa";
import Button from "../../../Button";
import ConfirmatioDialog from "../../../Dialog/Dialogs";
import TaskStatusBadge from "../../../Status/TaskStatusBadge";
import FormattedDate from "../../../FormattedDate";
import { useUserById } from "../../../../api/userApi";

const ICONS = {
  3: <MdKeyboardDoubleArrowUp />,
  2: <MdKeyboardArrowUp />,
  1: <MdKeyboardArrowDown />,
};

const TASK_TYPE = {
  1: "bg-toDo",
  2: "bg-inProgress",
  3: "bg-completed",
  4: "bg-pending",
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

function ListView({ tasks }) {
  const [openDialog, setOpenDialog] = useState(false);
  const [selected, setSelected] = useState(null);

  const deleteClicks = (id) => {
    setSelected(id);
    setOpenDialog(true);
  };

  const deleteHandler = () => {};

  const TableHeader = () => (
    <thead className="w-full border-b border-gray-300">
      <tr className="w-full text-left">
        <th className="py-2">Tiêu đề</th>
        <th className="py-2">Độ ưu tiên</th>
        <th className="py-2 line-clamp-1">Deadline</th>
        <th className="py-2">File</th>
        <th className="py-2">Tạo bởi</th>
        <th className="py-2">Người phụ trách</th>
        <th className="py-2"></th>
      </tr>
    </thead>
  );

  const TableRow = ({ task }) => {
    const {
      data: userDetail,
      isLoading: userLoading,
      isError: userError,
    } = useUserById(task.ownerId);

    return (
      <tr className="border-b border-gray-200 text-gray-600 hover:bg-gray-300/10">
        <td className="py-2 w-64">
          <div className="flex items-center gap-2">
            <div
              className={clsx("w-4 h-4 rounded-full", TASK_TYPE[task.status])}
            />
            <p className="w-full line-clamp-2 text-base text-black">
              {task.taskName}
            </p>
          </div>
        </td>

        <td className="py-2">
          <div className={"flex gap-1 items-center"}>
            <span className={clsx("text-lg", PRIOTITYSTYELS[task.rate])}>
              {ICONS[task.rate]}
            </span>
            <span className="capitalize line-clamp-1">
              {getPriorityLabel(task.rate)} Priority
            </span>
          </div>
        </td>

        <td className="py-2">
          <span>
            <FormattedDate date={task.deadline} />
          </span>
        </td>

        <td className="py-2">
          <div className="flex items-center gap-3">
            <div className="flex gap-1 items-center text-sm text-gray-600 dark:text-gray-400">
              <MdAttachFile />
              <span>0</span>
            </div>
            <div className="flex gap-1 items-center text-sm text-gray-600 dark:text-gray-400">
              <FaList />
              <span>0</span>
            </div>
          </div>
        </td>

        <td className="py-2">{userDetail?.userName || "Unknown"}</td>
        <td>
           {/* <div className='flex'>
          {task?.team?.map((m, index) => (
            <div
              key={m._id}
              className={clsx(
                "w-7 h-7 rounded-full text-white flex items-center justify-center text-sm -mr-1",
                BGS[index % BGS?.length]
              )}
            >
              <UserInfo user={m} />
            </div>
          ))}
        </div> */}
        </td>

        <td className="py-2 flex gap-2 md:gap-4 justify-end">
          <Button
            className="text-blue-600 hover:text-blue-500 sm:px-0 text-sm md:text-base"
            label="Edit"
            type="button"
          />

          <Button
            className="text-red-700 hover:text-red-500 sm:px-0 text-sm md:text-base"
            label="Delete"
            type="button"
            onClick={() => deleteClicks(task._id)}
          />
        </td>
      </tr>
    );
  };

  return (
    <>
      <div className="bg-white px-2 md:px-4 pt-4 pb-9 shadow-md rounded">
        <div className="overflow-x-auto">
          <table className="w-full">
            <TableHeader />
            <tbody>
              {tasks.map((task, index) => (
                <TableRow key={index} task={task} />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* TODO */}
      <ConfirmatioDialog
        open={openDialog}
        setOpen={setOpenDialog}
        onClick={deleteHandler}
      />
    </>
  );
}

export default ListView;
