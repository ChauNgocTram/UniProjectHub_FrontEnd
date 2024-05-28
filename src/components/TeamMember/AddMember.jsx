import React from "react";
import { useForm } from "react-hook-form";
//import { useSelector } from "react-redux";
import { DialogTitle } from "@headlessui/react";
import ModalWrapper from "../Modal/ModalWrapper";
import Textbox from "../Textbox";
import Button from "../Button";


function AddMember({ open, setOpen, userData }) {
    let defaultValues = userData ?? {};
  //const { user } = useSelector((state) => state.auth);

  const isLoading = false,
    isUpdating = false;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });

  const handleOnSubmit = () => {};
  return (
    <>
    <ModalWrapper open={open} setOpen={setOpen}>
      <form onSubmit={handleSubmit(handleOnSubmit)} className=''>
        <DialogTitle
          as='h2'
          className='text-base font-bold leading-6 text-gray-900 mb-4'
        >
          {userData ? "CẬP NHẬT THÔNG TIN" : "THÊM THÀNH VIÊN"}
        </DialogTitle>
        <div className='mt-2 flex flex-col gap-6'>
          <Textbox
            placeholder='Nhập họ và tên'
            type='text'
            name='name'
            label='Họ và tên'
            className='w-full rounded'
            register={register("name", {
              required: "Vui lòng nhập họ tên thành viên!",
            })}
            error={errors.name ? errors.name.message : ""}
          />
          <Textbox
            placeholder='Vai trò trong dự án'
            type='text'
            name='role'
            label='Vai trò'
            className='w-full rounded'
            register={register("role", {
              required: "Vui lòng nhập vai trò!",
            })}
            error={errors.role ? errors.role.message : ""}
          />
          <Textbox
            placeholder='Địa chỉ mail'
            type='email'
            name='email'
            label='Email'
            className='w-full rounded'
            register={register("email", {
              required: "Vui lòng nhập địa chỉ mail!",
            })}
            error={errors.email ? errors.email.message : ""}
          />

          
        </div>

        {/* {isLoading || isUpdating ? (
          <div className='py-5'>
            <Loading />
          </div>
        ) : ( */}
          <div className='py-3 mt-4 sm:flex sm:flex-row-reverse space-x-4'>
            <Button
              type='submit'
              className='bg-mainColor px-8 text-sm font-semibold text-neutral-800 hover:bg-mainBg sm:w-auto rounded-lg'
              label='Thêm'
            />

            <Button
              type='button'
              className='bg-white hover:bg-neutral-200 px-5 text-sm font-semibold text-gray-700 sm:w-auto rounded-lg'
              onClick={() => setOpen(false)}
              label='Huỷ'
            />
          </div>
        {/* )} */}
      </form>
    </ModalWrapper>
  </>
  )
}

export default AddMember