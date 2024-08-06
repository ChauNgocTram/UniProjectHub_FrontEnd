import React from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { showConfirmationDialog } from "../../Alert/showConfirmationDialog";
import { useDeleteSubTask } from "../../../api/subTaskApi";

function DeleteSubTask({ subTask, onDelete }) {
  const mutation = useDeleteSubTask();

  const handleDeleteSubTask = async () => {
    const result = await showConfirmationDialog({
      title: "Bạn muốn xoá công việc này?",
      html: `Công việc này sẽ được xoá khỏi task của bạn`,
      confirmButtonText: "Xác nhận",
      cancelButtonText: "Huỷ",
    });

    if (result.isConfirmed) {
      mutation.mutate(subTask.id, {
        onSuccess: () => {
          if (onDelete) onDelete(subTask.id);
        },
      });
    }
  };

  return (
    <button
      onClick={handleDeleteSubTask}
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

export default DeleteSubTask;
