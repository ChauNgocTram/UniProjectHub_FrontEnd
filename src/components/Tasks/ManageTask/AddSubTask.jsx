import React from "react";
import { useForm } from "react-hook-form";
import ModalWrapper from "../../Modal/ModalWrapper";
import { DialogTitle } from "@headlessui/react";
import Textbox from "../../Textbox";
import Button from "../../Button";
import { useState } from "react";
import api from "../../../config/axios";
import { alert } from "../../Alert/Alert";


function AddSubTask({ open, setOpen, id }) {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
      } = useForm();
    
      // const [addSbTask] = useCreateSubTaskMutation();
      const [loading, setLoading] = useState(false);
      const handleOnSubmit = async (data) => {
        setLoading(true)
    try {
      const payload = {
        taskId:id,
        description: data.description,
   
      //  tags: data.tags, 
        deadline: new Date(data.date).toISOString(),
     
      };

      const response = await api.post(`/api/SubTask/CreateSubTaskAsync`, payload);
      console.log("Create task response:", response.data); 

      if (response.status === 200) {
      //  onTaskAdded();
        setOpen(false);
        alert.alertSuccessWithTime(
          "Thêm Việc Thành Công",
          "",
          2000,
          "30",
          () => {}
        );
        reset();
      } else {
        console.error("Failed to create task", response.data);
        alert.alertFailed(
          "Thêm việc không thành công",
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
            <form onSubmit={handleSubmit(handleOnSubmit)} className=''>
              <DialogTitle
                as='h2'
                className='text-base font-bold leading-6 text-gray-900 mb-4'
              >
                THÊM VIỆC CẦN LÀM
              </DialogTitle>
              <div className='mt-2 flex flex-col gap-6'>
                <Textbox
                  placeholder='Việc cần làm'
                  type='text'
                  name='description'
                  label='Tiêu đề'
                  className='w-full rounded'
                  register={register("description", {
                    required: "Vui lòng điền việc cần làm!",
                  })}
                  error={errors.description ? errors.description.message : ""}
                />
    
                <div className='flex items-center gap-4'>
                  <Textbox
                    placeholder='dd-mm-yyyy'
                    type='date'
                    name='date'
                    label='Deadline'
                    className='w-full rounded'
                    register={register("date", {
                      required: "Vui lòng chọn ngày tháng!",
                    })}
                    error={errors.date ? errors.date.message : ""}
                  />
                  <Textbox
                    placeholder='Tag'
                    type='text'
                    name='tag'
                    label='Tag'
                    className='w-full rounded'
                    // register={register("tag", {
                    //   required: "Tag is required!",
                    // })}
                    // error={errors.tag ? errors.tag.message : ""}
                  />
                </div>
              </div>
              <div className='py-3 mt-4 flex sm:flex-row-reverse gap-4'>
                <Button
                  type='submit'
                  className='bg-mainColor text-sm font-semibold text-neutral-800 hover:bg-mainBg sm:ml-3 sm:w-auto rounded-lg'
                  label='Thêm việc cần làm'
                />
    
                <Button
                  type='button'
                  className='bg-white hover:bg-neutral-200 border text-sm font-semibold text-gray-700 sm:w-auto rounded-lg'
                  onClick={() => setOpen(false)}
                  label='Huỷ'
                />
              </div>
            </form>
          </ModalWrapper>
        </>
      );
}

export default AddSubTask