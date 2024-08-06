import React, { useState } from "react";
import { useForm } from "react-hook-form";
import ModalWrapper from "../../Modal/ModalWrapper";
import { DialogTitle } from "@headlessui/react";
import Textbox from "../../Textbox";
import Button from "../../Button";
import { useCreateSubTask } from "../../../api/subTaskApi";

function AddSubTask({ open, setOpen, taskId }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [loading, setLoading] = useState(false);
  const createSubTaskMutation = useCreateSubTask();

  const handleOnSubmit = async (data) => {
    setLoading(true);

    const payload = {
      taskId: taskId,
      description: data.description,
      tags: data.tag || "",
      deadline: new Date(data.date).toISOString(),
    };
    console.log("check", payload);
    try {
      await createSubTaskMutation.mutateAsync(payload);
      setOpen(false);
      reset();
    } catch (error) {
      console.error("Error creating subtask:", error);
    }

    setLoading(false);
  };

  return (
    <ModalWrapper open={open} setOpen={setOpen}>
      <form onSubmit={handleSubmit(handleOnSubmit)} className="">
        <DialogTitle
          as="h2"
          className="text-base font-bold leading-6 text-gray-900 mb-4"
        >
          THÊM VIỆC CẦN LÀM
        </DialogTitle>
        <div className="mt-2 flex flex-col gap-6">
          <Textbox
            placeholder="Việc cần làm"
            type="text"
            name="description"
            label="Tiêu đề"
            className="w-full rounded"
            register={register("description", {
              required: "Vui lòng điền việc cần làm!",
            })}
            error={errors.description ? errors.description.message : ""}
          />

          <div className="flex items-center gap-4">
            <Textbox
              placeholder="dd-mm-yyyy"
              type="date"
              name="date"
              label="Deadline"
              className="w-full rounded"
              register={register("date", {
                required: "Vui lòng chọn ngày tháng!",
              })}
              error={errors.date ? errors.date.message : ""}
            />
            <Textbox
              placeholder="Tag"
              type="text"
              name="tag"
              label="Tag"
              className="w-full rounded"
            />
          </div>
        </div>
        <div className="py-3 mt-4 flex sm:flex-row-reverse gap-4">
          <Button
            type="submit"
            className="bg-mainColor text-sm font-semibold text-neutral-800 hover:bg-mainBg sm:ml-3 sm:w-auto rounded-lg"
            label="Thêm việc cần làm"
            disabled={loading}
          />

          <Button
            type="button"
            className="bg-white hover:bg-neutral-200 border text-sm font-semibold text-gray-700 sm:w-auto rounded-lg"
            onClick={() => setOpen(false)}
            label="Huỷ"
          />
        </div>
      </form>
    </ModalWrapper>
  );
}

export default AddSubTask;
