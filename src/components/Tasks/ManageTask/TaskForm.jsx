import React from "react";
import { DialogTitle } from "@headlessui/react";
import { useForm } from "react-hook-form";
import Textbox from "../../Textbox";
import SelectList from "../../SelectList";
import Button from "../../Button";

const LISTS = ["TODO", "IN PROGRESS", "COMPLETED", "PENDING"];
const PRIORITY = ["LOW", "MEDIUM", "HIGH"];

function TaskForm({ onSubmit, loading, setOpen, stage, setStage, priority, setPriority }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const submitForm = (data) => {
    onSubmit(data, reset);
  };

  return (
    <form onSubmit={handleSubmit(submitForm)}>
      <DialogTitle
        as="h2"
        className="text-base font-bold leading-6 text-gray-900 mb-4"
      >
         Tạo Task
      </DialogTitle>

      <div className="mt-2 flex flex-col gap-6">
        <Textbox
          placeholder="Nhập tiêu đề"
          type="text"
          name="taskName"
          label="Tiêu đề"
          className="w-full rounded"
          register={register("taskName", { required: "Vui lòng nhập tiêu đề" })}
          error={errors.taskName ? errors.taskName.message : ""}
        />

        <div className="flex gap-4">
          <SelectList
            label="Trạng thái"
            lists={LISTS}
            selected={stage}
            setSelected={setStage}
          />

          <div className="w-full">
            <SelectList
              label="Mức độ ưu tiên"
              lists={PRIORITY}
              selected={priority}
              setSelected={setPriority}
            />
          </div>
        </div>

        <Textbox
          placeholder="Ngày hoàn thành"
          type="date"
          name="date"
          label="Ngày hoàn thành"
          className="w-full rounded"
          register={register("date", { required: "Vui lòng chọn ngày!" })}
          error={errors.date ? errors.date.message : ""}
        />

        <div className="bg-gray-50 py-6 sm:flex sm:flex-row-reverse gap-4">
          {loading ? (
            <span className="text-sm py-2 text-red-500">Loading...</span>
          ) : (
            <Button
              label="Tạo"
              type="submit"
              className="bg-mainColor text-sm font-semibold text-neutral-800 hover:bg-mainBg sm:ml-3 sm:w-auto rounded-lg"
            />
          )}

          <Button
            type="button"
            className="bg-white hover:bg-neutral-200 border text-sm font-semibold text-gray-700 sm:w-auto rounded-lg"
            onClick={() => setOpen(false)}
            label="Huỷ"
          />
        </div>
      </div>
    </form>
  );
}

export default TaskForm;
