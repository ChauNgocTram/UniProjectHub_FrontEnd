import React, { useState } from "react";
import { useForm } from "react-hook-form";
import ModalWrapper from "../../Modal/ModalWrapper";
import { DialogTitle } from "@headlessui/react";
import Textbox from "../../Textbox";
import Button from "../../Button";
import { useAddSchedule } from "../../../api/scheduleApi";

function AddSchedule({ open, setOpen }) {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { mutate: addSchedule, isLoading } = useAddSchedule();

  const submitHandler = (data) => {
    const scheduleData = {
      userId: data.userId, // Add userId from form data
      dateOfWeek: data.dateOfWeek,
      startTime: data.startTime,
      endTime: data.endTime,
      slotStartTime: data.slotStartTime,
      slotEndTime: data.slotEndTime,
      courseName: data.courseName,
    };

    addSchedule(scheduleData);
    setOpen(false); // Close modal after submission
  };

  return (
    <ModalWrapper open={open} setOpen={setOpen}>
      <form onSubmit={handleSubmit(submitHandler)}>
        <DialogTitle as="h2" className="text-base font-bold leading-6 text-gray-900 mb-4">
          TẠO LỊCH
        </DialogTitle>

        <div className="mt-2 flex flex-col gap-6">
          <Textbox
            placeholder="Nhập userId"
            type="text"
            name="userId"
            label="User ID"
            className="w-full rounded"
            register={register("userId", { required: "User ID is required" })}
            error={errors.userId ? errors.userId.message : ""}
          />
          
          <Textbox
            placeholder="Nhập ngày trong tuần"
            type="text"
            name="dateOfWeek"
            label="Ngày trong tuần"
            className="w-full rounded"
            register={register("dateOfWeek", { required: "Date of Week is required" })}
            error={errors.dateOfWeek ? errors.dateOfWeek.message : ""}
          />

          <Textbox
            placeholder="Bắt đầu (ISO 8601)"
            type="datetime-local"
            name="startTime"
            label="Bắt đầu"
            className="w-full rounded"
            register={register("startTime", { required: "Start Time is required" })}
            error={errors.startTime ? errors.startTime.message : ""}
          />

          <Textbox
            placeholder="Kết thúc (ISO 8601)"
            type="datetime-local"
            name="endTime"
            label="Kết thúc"
            className="w-full rounded"
            register={register("endTime", { required: "End Time is required" })}
            error={errors.endTime ? errors.endTime.message : ""}
          />

          <Textbox
            placeholder="Bắt đầu slot (ISO 8601)"
            type="datetime-local"
            name="slotStartTime"
            label="Bắt đầu Slot"
            className="w-full rounded"
            register={register("slotStartTime", { required: "Slot Start Time is required" })}
            error={errors.slotStartTime ? errors.slotStartTime.message : ""}
          />

          <Textbox
            placeholder="Kết thúc slot (ISO 8601)"
            type="datetime-local"
            name="slotEndTime"
            label="Kết thúc Slot"
            className="w-full rounded"
            register={register("slotEndTime", { required: "Slot End Time is required" })}
            error={errors.slotEndTime ? errors.slotEndTime.message : ""}
          />

          <Textbox
            placeholder="Nhập tên khóa học"
            type="text"
            name="courseName"
            label="Tên khóa học"
            className="w-full rounded"
            register={register("courseName", { required: "Course Name is required" })}
            error={errors.courseName ? errors.courseName.message : ""}
          />

          <div className="bg-gray-50 py-6 sm:flex sm:flex-row-reverse gap-4">
            <Button
              label={isLoading ? "Đang tạo..." : "Tạo"}
              type="submit"
              className="bg-mainColor text-sm font-semibold text-neutral-800 hover:bg-mainBg sm:ml-3 sm:w-auto rounded-lg"
              disabled={isLoading}
            />

            <Button
              type="button"
              className="bg-white hover:bg-neutral-200 border text-sm font-semibold text-gray-700 sm:w-auto rounded-lg"
              onClick={() => setOpen(false)}
              label="Huỷ"
            />
          </div>
        </div>
      </form>
    </ModalWrapper>
  );
}

export default AddSchedule;
