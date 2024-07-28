import { DialogTitle } from "@headlessui/react";
import PropTypes from "prop-types";
import { deleteSchedule } from "../../../api/scheduleApi";
import Button from "../../../components/Button";
import ModalWrapper from "../../../components/Modal/ModalWrapper";

const DeleteSchedule = ({ open, setOpen, scheduleId, onScheduleDeleted }) => {
  const handleDelete = async () => {
    try {
      await deleteSchedule(scheduleId);
      setOpen(false);
      if (onScheduleDeleted) {
        onScheduleDeleted();
      }
    } catch (error) {
      console.error("Error deleting schedule:", error.message);
    }
  };

  return (
    <ModalWrapper open={open} setOpen={setOpen}>
      <div className="p-6">
        <DialogTitle
          as="h2"
          className="text-base font-bold leading-6 text-gray-900 mb-4"
        >
          XÓA LỊCH TRÌNH
        </DialogTitle>
        <p className="text-gray-700 mb-4">
          Bạn có chắc chắn muốn xóa lịch trình này? Hành động này không thể hoàn
          tác.
        </p>
        <div className="flex gap-4">
          <Button
            label="Xóa"
            type="button"
            onClick={handleDelete}
            className="bg-red-600 text-sm font-semibold text-white hover:bg-red-700 rounded-lg"
          />
          <Button
            type="button"
            className="bg-white hover:bg-gray-200 border text-sm font-semibold text-gray-700 rounded-lg"
            onClick={() => setOpen(false)}
            label="Huỷ"
          />
        </div>
      </div>
    </ModalWrapper>
  );
};

DeleteSchedule.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  scheduleId: PropTypes.string.isRequired,
  onScheduleDeleted: PropTypes.func,
};

export default DeleteSchedule;
