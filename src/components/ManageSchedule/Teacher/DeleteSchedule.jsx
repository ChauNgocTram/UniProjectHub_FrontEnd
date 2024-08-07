import React from 'react';
import { RiDeleteBin6Line } from "react-icons/ri";
import { showConfirmationDialog } from "../../Alert/showConfirmationDialog";
import { useDeleteSchedule } from '../../../api/scheduleApi';

const DeleteSchedule = ({ schedule, onDelete }) => {
    const mutation = useDeleteSchedule();

    const handleDeleteTask = async () => {
        const result = await showConfirmationDialog({
            title: "Bạn muốn xoá task này?",
            html: `<strong>${schedule.courseName}</strong> sẽ được xoá khỏi dự án của bạn`,
            confirmButtonText: "Xác nhận",
            cancelButtonText: "Huỷ",
        });

        if (result.isConfirmed) {
            mutation.mutate(schedule.id, {
                onSuccess: () => {
                    if (onDelete) onDelete(schedule.id);
                },
            });
        }
    };

    return (
        <button
            onClick={handleDeleteTask}
            className="group flex w-full items-center rounded-md px-2 text-sm text-red-900 hover:bg-blueLevel1"
        >
            <RiDeleteBin6Line
                className="mr-2 h-5 w-5 text-red-400"
                aria-hidden="true"
            />
            
        </button>
    );
};

export default DeleteSchedule;
