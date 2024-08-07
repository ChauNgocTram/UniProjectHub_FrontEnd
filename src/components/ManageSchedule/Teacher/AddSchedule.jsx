import React, { useState } from "react";
import { useForm } from "react-hook-form";
import ModalWrapper from "../../Modal/ModalWrapper";
import { DialogTitle } from "@headlessui/react";
import Textbox from "../../Textbox";
import Button from "../../Button";
import { useAddSchedule } from "../../../api/scheduleApi";
import { useSelector } from "react-redux";
import { selectUser } from "../../../redux/features/userSlice";
import Select from 'react-select';

const daysOfWeek = [
  { value: 'Monday', label: 'Monday' },
  { value: 'Tuesday', label: 'Tuesday' },
  { value: 'Wednesday', label: 'Wednesday' },
  { value: 'Thursday', label: 'Thursday' },
  { value: 'Friday', label: 'Friday' },
  { value: 'Saturday', label: 'Saturday' },
  { value: 'Sunday', label: 'Sunday' },
];

function AddSchedule({ open, setOpen }) {
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm();
  const { mutate: addSchedule, isLoading } = useAddSchedule();
  const user = useSelector(selectUser);
  const userID = user.userId;

  const [dateOfWeek, setDateOfWeek] = useState(null);

  const submitHandler = (data) => {
    const convertToUTC = (localDateTime) => {
      if (!localDateTime) return '';
      const localDate = new Date(localDateTime);
      return new Date(localDate.getTime() - localDate.getTimezoneOffset() * 60000).toISOString();
    };
  
    const scheduleData = {
      userId: userID,
      dateOfWeek: dateOfWeek ? dateOfWeek.value : '',
      startTime: convertToUTC(data.startTime),
      endTime: convertToUTC(data.endTime),
      slotStartTime: convertToUTC(data.slotStartTime),
      slotEndTime: convertToUTC(data.slotEndTime),
      courseName: data.courseName,
    };
  
    addSchedule(scheduleData);
    setOpen(false);
  };
  

  return (
    <ModalWrapper open={open} setOpen={setOpen}>
      <form onSubmit={handleSubmit(submitHandler)}>
        <DialogTitle as="h2" className="text-base font-bold leading-6 text-gray-900 mb-4">
          TẠO LỊCH
        </DialogTitle>

        <div className="mt-2 flex flex-col gap-6">
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Ngày trong tuần</label>
            <Select
              options={daysOfWeek}
              value={dateOfWeek}
              onChange={setDateOfWeek}
              placeholder="Chọn ngày trong tuần"
              className="mt-1"
            />
            {errors.dateOfWeek && <p className="text-red-600 text-xs">{errors.dateOfWeek.message}</p>}
          </div>

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
