import React, { useState }  from "react";
import {
  MdAttachFile,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdKeyboardDoubleArrowUp,
} from "react-icons/md";
import { BGS, PRIOTITYSTYELS, formatDate } from "../../../../utils";
import clsx from "clsx";
import { FaList } from "react-icons/fa";
import Button from "../../../Button";
import FormattedDate from "../../../FormattedDate";
import DeleteTask from "../../ManageTask/DeleteTask";
import { useSubTasksByTaskId } from "../../../../api/subTaskApi";

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

function PersonalListView({ tasks = [] }) {
  const TableHeader = () => (
    <thead className="w-full border-b border-gray-300">
      <tr className="w-full text-left">
        <th className="py-2">Tiêu đề</th>
        <th className="py-2">Độ ưu tiên</th>
        <th className="py-2">Ngày bắt đầu</th>
        <th className="py-2 line-clamp-1">Deadline</th>
        <th className="py-2">File</th>
        <th className="py-2"></th>
      </tr>
    </thead>
  );

  const TableRow = ({ task = {} }) => {
    const { data: subTasks = [], isLoading, isError } = useSubTasksByTaskId(task.id);

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
            <FormattedDate date={task.startDate} />
          </span>
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
              <span>{subTasks.length}</span>
            </div>
          </div>
        </td>

        <td className="py-2 flex gap-2 md:gap-4 justify-end">
          <Button
            className="text-blue-600 hover:text-blue-500 sm:px-0 text-sm md:text-base"
            label="Edit"
            type="button"
          />

          <DeleteTask task={task} />
        </td>
      </tr>
    );
  };

  return (
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
  );
}

export default PersonalListView;
