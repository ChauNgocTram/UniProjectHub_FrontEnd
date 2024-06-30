import React, { useState } from "react";
import ModalWrapper from "../../Modal/ModalWrapper";
import { DialogTitle } from "@headlessui/react";
import Textbox from "../../Textbox";
import { useForm } from "react-hook-form";
import SelectList from "../../SelectList";
import Button from "../../Button";
import api from "../../../config/axios";
import { alert } from "../../../components/Alert/Alert"

const LISTS = ["TODO", "IN PROGRESS", "COMPLETED", "PENDING"];
const PRIORITY = ["LOW", "MEDIUM", "HIGH"];

function AddTask({ open, setOpen, projectId, onTaskAdded  }) { 
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [stage, setStage] = useState(LISTS[0]);
  const [priority, setPriority] = useState(PRIORITY[2]);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const submitHandler = async (data) => {
    setLoading(true)
    try {
      const payload = {
        taskName: data.taskName,
        description: data.description,
        status: LISTS.indexOf(stage) + 1,
        category: data.category, 
        tags: data.tags, 
        deadline: new Date(data.date).toISOString(),
        rate: PRIORITY.indexOf(priority) + 1,
        comment: data.comment, 
      };

      const response = await api.post(`/api/Task/CreateTask/${projectId}`, payload);
      console.log("Create task response:", response.data); 

      if (response.status === 200) {
        onTaskAdded();
        setOpen(false);
        alert.alertSuccessWithTime(
          "Tạo Task Thành Công",
          "",
          2000,
          "30",
          () => {}
        );
        reset();
      } else {
        console.error("Failed to create task", response.data);
        alert.alertFailed(
          "Tạo Task Thất Bại",
          "Vui lòng thử lại",
          2000,
          "30",
          () => {}
        );
      }
    } catch (error) {
      console.error("Error creating task", error);
    }
    setLoading(false)
  };

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
              register={register("date", {
                required: "Vui lòng chọn ngày!",
              })}
              error={errors.date ? errors.date.message : ""}
            />

            <div className="bg-gray-50 py-6 sm:flex sm:flex-row-reverse gap-4">
              {uploading ? (
                <span className="text-sm py-2 text-red-500">
                  Uploading assets
                </span>
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
      </ModalWrapper>
    </>
  );
}

export default AddTask;
