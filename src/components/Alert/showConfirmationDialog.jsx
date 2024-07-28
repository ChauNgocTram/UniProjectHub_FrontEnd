import Swal from "sweetalert2";

export const showConfirmationDialog = async ({
  title = "Are you sure?",
  text = "",
  confirmButtonText = "Yes, delete it!",
  cancelButtonText = "Cancel",
  confirmButtonColor = "#3085d6",
  cancelButtonColor = "#d33",
}) => {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: `bg-blueLevel5 hover:bg-blueLevel3 text-white mx-3 px-4 py-2 rounded ${confirmButtonColor}`,
      cancelButton: `bg-red-500 hover:bg-red-600 text-white mx-3 px-4 py-2 rounded ${cancelButtonColor}`,
    },
    buttonsStyling: false,
  });

  const result = await swalWithBootstrapButtons.fire({
    title,
    text,
    icon: "warning",
    showCancelButton: true,
    confirmButtonText,
    cancelButtonText,
    reverseButtons: true,
    focusConfirm: false,
  });

  return result;
};
