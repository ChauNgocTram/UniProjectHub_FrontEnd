import React, { useState } from "react";
import ModalWrapper from "../../Modal/ModalWrapper";
import { DialogTitle } from "@headlessui/react";
import Textbox from "../../Textbox";
import { useForm } from "react-hook-form";
import SelectList from "../../SelectList";
import Button from "../../Button";
import { alert } from "../../../components/Alert/Alert";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import { useCreateTask } from "../../../api/taskApi";

const LISTS = ["TODO", "IN PROGRESS", "COMPLETED", "PENDING"];
const PRIORITY = ["LOW", "MEDIUM", "HIGH"];

function AddTask({ open, setOpen, projectId }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm();
  const [stage, setStage] = useState(LISTS[0]);
  const [priority, setPriority] = useState(PRIORITY[2]);
  const [loading, setLoading] = useState(false);

  const mutation = useCreateTask();

  const submitHandler = async (data) => {
    setLoading(true);
    const payload = {
      taskName: data.taskName,
      status: LISTS.indexOf(stage) + 1,
      category: data.category,
      tags: data.tags,
      startDate: new Date(data.startDate).toISOString(),
      deadline: new Date(data.deadline).toISOString(),
      rate: PRIORITY.indexOf(priority) + 1,
      comment: data.comment,
    };
    try {
      mutation.mutate(
        { projectId, payload },
        {
          onSuccess: () => {
            setOpen(false);
            reset();
          },
        }
      );
    } catch (error) {
      console.error("Error creating task", error);
      alert.alertFailed(
        "Tạo Task Thất Bại",
        error.message,
        2000,
        "30",
        () => {}
      );
    }
    setLoading(false);
  };

  const startDate = watch("startDate");

  return (
    <>
      <ModalWrapper open={open} setOpen={setOpen}>
        <form onSubmit={handleSubmit(submitHandler)}>
          <DialogTitle
            as="h2"
            className="text-base font-bold leading-6 text-gray-900 mb-4"
          >
            TẠO TASK
          </DialogTitle>

          <div className="mt-2 flex flex-col gap-6">
            <Textbox
              placeholder="Nhập tiêu đề"
              type="text"
              name="taskName"
              label="Tiêu đề"
              className="w-full rounded"
              register={register("taskName", {
                required: "Vui lòng nhập tiêu đề",
              })}
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

            <div className="flex items-start gap-4">
              <Textbox
                placeholder="Date"
                type="date"
                name="startDate"
                label="Ngày bắt đầu"
                className="w-full rounded"
                register={register("startDate", {
                  required: "Vui lòng chọn ngày!",
                })}
                error={errors.startDate ? errors.startDate.message : ""}
              />
              <div className="text-blue-500 font-semibold">
                <MdOutlineKeyboardDoubleArrowRight size={20} />
              </div>
              <Textbox
                placeholder="Date"
                type="date"
                name="deadline"
                label="Ngày hoàn thành"
                className="w-full rounded"
                register={register("deadline", {
                  required: "Vui lòng chọn ngày!",
                  validate: (value) =>
                    !startDate || new Date(value) >= new Date(startDate)
                      ? true
                      : "Ngày hoàn thành phải lớn hơn ngày bắt đầu",
                })}
                error={errors.deadline ? errors.deadline.message : ""}
              />
            </div>

            <div className="bg-gray-50 py-6 sm:flex sm:flex-row-reverse gap-4">
              <Button
                label="Tạo"
                type="submit"
                className="bg-mainColor text-sm font-semibold text-neutral-800 hover:bg-mainBg sm:ml-3 sm:w-auto rounded-lg"
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
    </>
  );
}

export default AddTask;
