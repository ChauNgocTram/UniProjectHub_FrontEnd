import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import ModalWrapper from "../../Modal/ModalWrapper";
import { DialogTitle } from "@headlessui/react";
import Textbox from "../../Textbox";
import Button from "../../Button";
import { useSubTasksById, useUpdateSubTask } from "../../../api/subTaskApi";
import { parseISO, format } from 'date-fns';

function UpdateSubTask({ open, setOpen, subTaskId }) {
  const { register, handleSubmit, setValue, formState: { errors }, reset } = useForm();
  const [loading, setLoading] = useState(false);

  const { data: subTask} = useSubTasksById(subTaskId);
  
  const updateSubTaskMutation = useUpdateSubTask();

  useEffect(() => {
    if (subTask) {
      const parsedDate = parseISO(subTask.deadline);
      const formattedDate = format(parsedDate, 'yyyy-MM-dd');
      setValue("description", subTask.description);
      setValue("date", formattedDate);
      setValue("tag", subTask.tags || "");
    }
  }, [subTask, setValue]);

  const handleOnSubmit = async (data) => {
    setLoading(true);

    const payload = {
      description: data.description,
      tags: data.tag || "",
      deadline: new Date(data.date).toISOString(),
    };

    try {
      await updateSubTaskMutation.mutateAsync({ subTaskId, payload });
      setOpen(false);
      reset();
    } catch (error) {
      console.error("Error updating subtask:", error);
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
          CẬP NHẬT VIỆC CẦN LÀM
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
            label="Cập nhật việc cần làm"
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

export default UpdateSubTask;
