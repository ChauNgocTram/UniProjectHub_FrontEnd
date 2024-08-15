import React, { useState }  from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDeleteTask } from "../../../api/taskApi";
import { showConfirmationDialog } from "../../Alert/showConfirmationDialog";

function DeleteTask({ task, onDelete }) {
  const mutation = useDeleteTask();

  const handleDeleteTask = async () => {
    const result = await showConfirmationDialog({
      title: "Bạn muốn xoá task này?",
      html: `<strong>${task.taskName}</strong> sẽ được xoá khỏi dự án của bạn`,
      confirmButtonText: "Xác nhận",
      cancelButtonText: "Huỷ",
    });

    if (result.isConfirmed) {
      mutation.mutate(task.id, {
        onSuccess: () => {
          if (onDelete) onDelete(task.id);
        },
      });
    }
  };

  return (
    <button
      onClick={handleDeleteTask}
      className="group flex w-full items-center rounded-md px-2 py-2 text-sm text-red-900 hover:bg-blueLevel1"
    >
      <RiDeleteBin6Line
        className="mr-2 h-5 w-5 text-red-400"
        aria-hidden="true"
      />
      Xoá
    </button>
  );
}

export default DeleteTask;
