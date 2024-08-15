import React, { useState }  from "react";
import Button from "../../components/Button";
import ModalWrapper from "../Modal/ModalWrapper";
import {format} from 'date-fns'

const ScheduleDetailsModal = ({ open, setOpen, event }) => {
  if (!event) return null; // Ensure there's an event before rendering

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <ModalWrapper open={open} setOpen={setOpen}>
      <div className="p-4">
        <h2 className="text-lg font-bold mb-4">{event.courseName}</h2>
        <p className="mb-2">
          <strong>Bắt đầu slot:</strong> {format(new Date(event.startTime), "dd/MM/yyyy HH:mm")}
        </p>
        <p className="mb-2">
          <strong>Kết thúc slot:</strong> {format(new Date(event.endTime), "dd/MM/yyyy HH:mm")}
        </p>
        <p className="mb-2">
          <strong>Vị trí:</strong> P.614 Nhà văn hoá sinh viên
        </p>

        <div className="mt-4 flex justify-end gap-4">
          <Button
            type="button"
            className="bg-white hover:bg-neutral-200 border text-sm font-semibold text-gray-700 rounded-lg"
            onClick={handleClose}
            label="Close"
          />
        </div>
      </div>
    </ModalWrapper>
  );
};

export default ScheduleDetailsModal;
