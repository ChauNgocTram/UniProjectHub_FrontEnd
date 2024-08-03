import React from 'react';
import { useDeleteGroupProject } from '../../../api/projectApi';
import { showConfirmationDialog } from '../../../components/Alert/showConfirmationDialog';

function DeleteTeamProject({ project, onDelete }) {
  const { mutate: deleteProject } = useDeleteGroupProject();

  const handleDeleteProject = async () => {
    const result = await showConfirmationDialog({
      title: "Bạn muốn xoá dự án?",
      text: `"${project.name}" sẽ bị xoá khỏi không gian làm việc của bạn`,
      confirmButtonText: "Xác nhận",
      cancelButtonText: "Huỷ",
    });

   
    if (result.isConfirmed) {
      try {
        await deleteProject(project.id);

        let storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
        storedFavorites = storedFavorites.filter(fav => fav !== project.id);
        localStorage.setItem("favorites", JSON.stringify(storedFavorites));

        if (onDelete) onDelete(project.id);
      } catch (error) {
        console.error('Delete project error:', error);
      }
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
