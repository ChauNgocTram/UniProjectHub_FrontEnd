import React from "react";

import { RiDeleteBin6Line } from "react-icons/ri";
import api from "../../../config/axios";
import { alert } from "../../Alert/Alert";
function DeleteTask({task, onDelete,handleReloadContent }) {
  const handleDeleteTask = async () => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton:
          "bg-blueLevel5 hover:bg-blueLevel3 text-white hover:text-textPrimary mx-3 px-4 py-2 rounded",
        cancelButton:
          "bg-red-500 hover:bg-red-600 text-white mx-3 px-4 py-2 rounded",
      },
      buttonsStyling: false,
    });

    const result = await swalWithBootstrapButtons.fire({
      title: "Bạn muốn xoá task này?",
      text: "Task sẽ được xoá khỏi dự án của bạn",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Xác nhận",
      cancelButtonText: "Huỷ",
      reverseButtons: true,
      focusConfirm: false,
    });

    if (result.isConfirmed) {
      try {
        const res = await api.delete(
          `/api/Task/DeleteTask/${task.id}`
        );
        if (res.status === 200) {
          alert.alertSuccessWithTime(
            "Xoá task thành công!",
            "",
            2000,
            "25",
            () => {}
          );
          handleReloadContent;
          if (onDelete) onDelete(task.id);
        } else {
          alert.alertFailedWithTime(
            "Failed to delete",
            "",
            2000,
            "25",
            () => {}
          );
        }
      } catch (error) {
        alert.alertFailedWithTime(
          "Failed to delete",
          error.message,
          2000,
          "25",
          () => {}
        );
      }
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      alert.alertFailedWithTime("Failed to delete", "", 2000, "25", () => {});
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
