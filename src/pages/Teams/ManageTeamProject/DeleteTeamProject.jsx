import React from "react";
import api from "../../../config/axios";
import { alert } from "../../../components/Alert/Alert";

function DeleteTeamProject({project, onDelete,handleReloadContent }) {
    const handleDeleteProject = async () => {
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
          title: "Bạn muốn xoá dự án?",
          text: "Dự án sẽ bị xoá khỏi không gian làm việc của bạn",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Xác nhận",
          cancelButtonText: "Huỷ",
          reverseButtons: true,
          focusConfirm: false,
        });
    
        if (result.isConfirmed) {
          try {
            const res = await api.delete(`/api/Project/DeleteProject/${project.id}`);
            if (res.status === 200) {
              alert.alertSuccessWithTime(
                "Xoá dự án thành công!",
                "",
                2000,
                "25",
                () => {}
              );
              handleReloadContent
              if (onDelete) onDelete(project.id); 
            } else {
              alert.alertFailedWithTime("Failed to delete", "", 2000, "25", () => {});
            }
          } catch (error) {
            alert.alertFailedWithTime("Failed to delete", error.message, 2000, "25", () => {});
          }
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          alert.alertFailedWithTime("Failed to delete", "", 2000, "25", () => {});
        }
      };

  return (
    <button
      onClick={handleDeleteProject}
      className="font-semibold inline-block w-full rounded-md py-2 hover:bg-mainBg/20 text-red-500"
    >
      Xoá dự án
    </button>
  );
}

export default DeleteTeamProject;
