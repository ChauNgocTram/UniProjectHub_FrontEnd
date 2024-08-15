import React , { useState } from "react";
import TaskCard from "./TaskCard";
import { clsx } from "clsx";

const BG_TASK_CARD = {
  1: "bg-toDo",
  2: "bg-inProgress",
  3: "bg-completed",
  4: "bg-pending",
};

const BoardViewAll = ({ tasks }) => {
  return (
    <div className="w-full py-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 2xl:gap-10">
      {tasks.map((task) => (
        <div
          key={task.id}
          className={clsx("rounded-lg h-fit p-4", BG_TASK_CARD[task.status])}
        >
          <TaskCard task={task} />
        </div>
      ))}
    </div>
  );
};

export default BoardViewAll;
