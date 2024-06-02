import React, { useState } from "react";
import ModalWrapper from "../../Modal/ModalWrapper";
import { DialogTitle } from "@headlessui/react";
import Textbox from "../../Textbox";
import { useForm } from "react-hook-form";
//import UserList from "./UserList";
import SelectList from "../../SelectList";
import { BiImages } from "react-icons/bi";
import Button from "../../Button"
import UserList from "../../UserInfo/UserList";

const LISTS = ["TODO", "IN PROGRESS", "COMPLETED"];
const PRIORIRY = ["HIGH", "MEDIUM", "NORMAL", "LOW"];

const uploadedFileURLs = [];

function AddTask({ open, setOpen }) {
  const task = "";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [team, setTeam] = useState(task?.team || []);
  const [stage, setStage] = useState(task?.stage?.toUpperCase() || LISTS[0]);
  const [priority, setPriority] = useState(
    task?.priority?.toUpperCase() || PRIORIRY[2]
  );
  const [assets, setAssets] = useState([]);
  const [uploading, setUploading] = useState(false);

  const submitHandler = () => {};

  const handleSelect = (e) => {
    setAssets(e.target.files);
  };

  return (
    <>
      <ModalWrapper open={open} setOpen={setOpen}>
        <form onSubmit={handleSubmit(submitHandler)}>
          <DialogTitle
            as='h2'
            className='text-base font-bold leading-6 text-gray-900 mb-4'
          >
            {task ? "CẬP NHẬT TASK" : "TẠO TASK"}
          </DialogTitle>

          <div className='mt-2 flex flex-col gap-6'>
            <Textbox
              placeholder='Nhập tiêu đề'
              type='text'
              name='title'
              label='Tiêu đề'
              className='w-full rounded'
              register={register("title", { required: "Title is required" })}
              error={errors.title ? errors.title.message : ""}
            />

            {/* <UserList setTeam={setTeam} team={team} /> */}
            <UserList/>
            <div className='flex gap-4'>
              <SelectList
                label='Trạng thái'
                lists={LISTS}
                selected={stage}
                setSelected={setStage}
              />

              <div className='w-full'>
                <Textbox
                  placeholder='Date'
                  type='date'
                  name='date'
                  label='Ngày hoàn thành'
                  className='w-full rounded'
                  register={register("date", {
                    required: "Vui lòng chọn ngày!",
                  })}
                  error={errors.date ? errors.date.message : ""}
                />
              </div>
            </div>

            <div className='flex gap-4'>
              <SelectList
                label='Mức độ ưu tiên'
                lists={PRIORIRY}
                selected={priority}
                setSelected={setPriority}
              />

              <div className='w-full flex items-center justify-center mt-4'>
                <label
                  className='flex items-center gap-1 text-base text-ascent-2 hover:text-ascent-1 cursor-pointer my-4'
                  htmlFor='imgUpload'
                >
                  <input
                    type='file'
                    className='hidden'
                    id='imgUpload'
                    onChange={(e) => handleSelect(e)}
                    accept='.jpg, .png, .jpeg'
                    multiple={true}
                  />
                  <BiImages />
                  <span>Thêm file</span>
                </label>
              </div>
            </div>

            <div className='bg-gray-50 py-6 sm:flex sm:flex-row-reverse gap-4'>
              {uploading ? (
                <span className='text-sm py-2 text-red-500'>
                  Uploading assets
                </span>
              ) : (
                <Button
                  label='Tạo'
                  type='submit'
                  className='bg-mainColor text-sm font-semibold text-neutral-800 hover:bg-mainBg sm:ml-3 sm:w-auto rounded-lg'
                />
              )}

              <Button
                type='button'
                className='bg-white hover:bg-neutral-200 border text-sm font-semibold text-gray-700 sm:w-auto rounded-lg'
                onClick={() => setOpen(false)}
                label='Huỷ'
              />
            </div>
          </div>
        </form>
      </ModalWrapper>
    </>
  );
}

export default AddTask