import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import ModalWrapper from '../../Modal/ModalWrapper';
import { DialogTitle } from '@headlessui/react';
import Textbox from '../../Textbox';
import Button from '../../Button';
import { useAddMemberInTask } from '../../../api/memberInTaskApi';


function AddMemberTask({ open, setOpen }) {
  const { id } = useParams(); 
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [loading, setLoading] = useState(false);
  const addMemberMutation = useAddMemberInTask();

  const handleOnSubmit = async (data) => {
    setLoading(true);

    const payload = {
      taskId: id,
      memberId: data.memberId
    };
    console.log(payload)
    try {
      await addMemberMutation.mutateAsync(payload);
    
      setOpen(false);
      reset();
    } catch (error) {
      console.error('Error adding member:', error);
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
          THÊM THÀNH VIÊN
        </DialogTitle>
        <div className="mt-2 flex flex-col gap-6">
          <Textbox
            placeholder="Member ID"
            type="text"
            name="memberId"
            label="ID Thành viên"
            className="w-full rounded"
            register={register("memberId", {
              required: "Vui lòng nhập ID thành viên!",
            })}
            error={errors.memberId ? errors.memberId.message : ""}
          />
        </div>
        <div className="py-3 mt-4 flex sm:flex-row-reverse gap-4">
          <Button
            type="submit"
            className="bg-mainColor text-sm font-semibold text-neutral-800 hover:bg-mainBg sm:ml-3 sm:w-auto rounded-lg"
            label="Thêm thành viên"
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

export default AddMemberTask;
