import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { MdTaskAlt } from "react-icons/md";
import FormattedDate from "../../FormattedDate";
import SubTaskDialog from "../../Dialog/SubTaskDialog";

const getDeadlineStyles = (deadline) => {
  const today = new Date();
  const deadlineDate = new Date(deadline);

  if (deadlineDate.toDateString() === today.toDateString()) {
    return {
      textColor: "text-red-600",
      iconColor: "text-red-600",
    };
  } else if (deadlineDate < today) {
    return {
      textColor: "text-gray-500",
      iconColor: "text-gray-500",
    };
  } else {
    return {
      textColor: "text-blue-600",
      iconColor: "text-green-600",
    };
  }
};

const AllSubTask = ({ subTask }) => {
  const [showAll, setShowAll] = useState(false);

  // Ensure subTask is an array
  const safeSubTask = Array.isArray(subTask) ? subTask : [];

  const sortedSubTasks = safeSubTask.slice().sort((a, b) => {
    const today = new Date();
    const dateA = new Date(a.deadline);
    const dateB = new Date(b.deadline);

    const isAFutureOrToday = dateA >= today;
    const isBFutureOrToday = dateB >= today;

    if (
      dateA.toDateString() === today.toDateString() &&
      dateB.toDateString() !== today.toDateString()
    ) {
      return -1;
    }
    if (
      dateB.toDateString() === today.toDateString() &&
      dateA.toDateString() !== today.toDateString()
    ) {
      return 1;
    }

    if (isAFutureOrToday && !isBFutureOrToday) {
      return -1;
    }
    if (!isAFutureOrToday && isBFutureOrToday) {
      return 1;
    }

    return dateA - dateB;
  });

  const displayedSubTasks = showAll
    ? sortedSubTasks
    : sortedSubTasks.slice(0, 4);

  useEffect(() => {
    console.log("subTask:", subTask);
    console.log("Is array:", Array.isArray(subTask));
  }, [subTask]);

  return (
    <div className="w-full md:w-1/2 space-y-2">
      <div className="pb-2">
        <p className="text-blueLevel5 font-semibold text-lg mb-3">
          VIỆC CẦN LÀM
        </p>
        <div className="space-y-4 overflow-y-auto h-[350px] scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent px-4">
          {displayedSubTasks.map((el, index) => {
            const { textColor, iconColor } = getDeadlineStyles(el.deadline);

            return (
              <div key={index} className="flex gap-3 justify-between">
                <div className="flex gap-3">
                  <div
                    className={clsx(
                      "w-10 h-10 flex items-center justify-center rounded-full",
                      iconColor
                    )}
                  >
                    <MdTaskAlt size={26} className={iconColor} />
                  </div>

                  <div className="space-y-1">
                    <div className="flex gap-2 items-center">
                      <span className={clsx("text-sm font-medium", textColor)}>
                        <FormattedDate date={el.deadline} />
                      </span>
                    </div>

                    <p className="text-gray-700">{el.description}</p>
                  </div>
                </div>

                <SubTaskDialog subTask={el} />
              </div>
            );
          })}
          {!showAll && sortedSubTasks.length > 4 && (
            <div className="flex items-center justify-center mt-1">
              <button
                className="text-blue-500 italic"
                onClick={() => setShowAll(true)}
              >
                Xem thêm...
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllSubTask;
