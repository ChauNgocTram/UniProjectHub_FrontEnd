import React, { useState } from "react";
import { useForm } from "react-hook-form";
import ModalWrapper from "../../Modal/ModalWrapper";
import { DialogTitle } from "@headlessui/react";
import Textbox from "../../Textbox";
import SelectList from "../../SelectList";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import Button from "../../Button";

function AddSchedule({ open, setOpen }) {
  const task = "";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitHandler = () => {};

  const handleSelect = (e) => {
    setAssets(e.target.files);
  };
  return (
    <>
      <div className="my-12">
        <ModalWrapper open={open} setOpen={setOpen}>
          <form onSubmit={handleSubmit(submitHandler)}>
            <DialogTitle
              as="h2"
              className="text-base font-bold leading-6 text-gray-900 mb-4"
            >
              {task ? "CẬP NHẬT TASK" : "TẠO LỊCH"}
            </DialogTitle>

            <div className="mt-2 flex flex-col gap-6">
              <Textbox
                placeholder="Nhập tiêu đề"
                type="text"
                name="title"
                label="Tiêu đề"
                className="w-full rounded"
                register={register("title", { required: "Title is required" })}
                error={errors.title ? errors.title.message : ""}
              />
              <Textbox
                placeholder="Nhập vị trí"
                type="text"
                name="location"
                label="Vị trí"
                className="w-full rounded"
                register={register("location", {
                  required: "location is required",
                })}
                error={errors.location ? errors.location.message : ""}
              />

              <Textbox
                placeholder="Date"
                type="datetime-local"
                name="date"
                label="Bắt đầu"
                className="w-full rounded"
                register={register("date", {
                  required: "Vui lòng chọn ngày!",
                })}
                error={errors.date ? errors.date.message : ""}
              />

              <Textbox
                placeholder="Date"
                type="datetime-local"
                name="date"
                label="Kết thúc"
                className="w-full rounded"
                register={register("date", {
                  required: "Vui lòng chọn ngày!",
                })}
                error={errors.date ? errors.date.message : ""}
              />

              <Textbox
                placeholder="Nhập mô tả"
                type="textarea"
                rows={2}
                name="description"
                label="Mô tả"
                className="w-full rounded"
                register={register("description", {
                  required: "description is required",
                })}
                error={errors.description ? errors.description.message : ""}
              />

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
      </div>
    </>
  );
}

export default AddSchedule;
