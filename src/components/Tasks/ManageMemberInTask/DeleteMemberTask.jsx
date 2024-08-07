import React from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { showConfirmationDialog } from "../../Alert/showConfirmationDialog";
import { useDeleteMemberInTask } from "../../../api/memberInTaskApi";

const DeleteMemberTask = ({ memberTask, onDelete }) => {
    const mutation = useDeleteMemberInTask();

    const handleDeleteMemberTask = async () => {
      const result = await showConfirmationDialog({
        title: "Bạn muốn xoá thành viên này?",
        html: `Công việc này sẽ được xoá khỏi task của bạn`,
        confirmButtonText: "Xác nhận",
        cancelButtonText: "Huỷ",
      });
  
      if (result.isConfirmed) {
        mutation.mutate(memberTask, {
          onSuccess: () => {
            if (onDelete) onDelete(memberTask);
          },
        });
      }
    };
  
    return (
      <button
        onClick={handleDeleteMemberTask}
        className="group flex w-full items-center rounded-md px-2 py-2 text-sm text-red-900 hover:bg-blueLevel1"
      >
        <RiDeleteBin6Line
          className="mr-2 h-5 w-5 text-red-400"
          aria-hidden="true"
        />
        Xoá thành viên
      </button>
    );
}

export default DeleteMemberTask