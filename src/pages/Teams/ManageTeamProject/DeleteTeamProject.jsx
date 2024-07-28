import React from 'react';
import Swal from 'sweetalert2';
import { useDeleteGroupProject } from '../../../api/projectApi';
import { alert } from '../../../components/Alert/Alert';
import { showConfirmationDialog } from '../../../components/Alert/showConfirmationDialog';

function DeleteTeamProject({ project, onDelete }) {
  const { mutate: deleteProject } = useDeleteGroupProject();

  const handleDeleteProject = async () => {
    const result = await showConfirmationDialog({
      title: "Bạn muốn xoá dự án?",
      text: "Dự án sẽ bị xoá khỏi không gian làm việc của bạn",
      confirmButtonText: "Xác nhận",
      cancelButtonText: "Huỷ",
    });

   
    if (result.isConfirmed) {
      try {
        await deleteProject(project.id);
        if (onDelete) onDelete(project.id);
      } catch (error) {
        console.error('Delete project error:', error);
      }
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      alert.alertFailedWithTime('Xoá dự án thất bại', '', 2000, '25', () => {});
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
