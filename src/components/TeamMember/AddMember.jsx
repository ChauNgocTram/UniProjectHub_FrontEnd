import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { DialogTitle } from "@headlessui/react";
import ModalWrapper from "../Modal/ModalWrapper";
import Textbox from "../Textbox";
import Button from "../Button";
import Select from "react-select";
import { useGetAllUser } from "../../api/userApi";
import { useAddMember } from "../../api/memberOfProjectApi";

function AddMember({ open, setOpen, userData, projectId }) {
  const { data: users, isLoading } = useGetAllUser();
  const [selectedUser, setSelectedUser] = useState(null);
  const [isOwner, setIsOwner] = useState(false);
  const { mutate: addMember } = useAddMember();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: userData ?? { role: "" },
  });

  const handleOnSubmit = async (data) => {
    if (!selectedUser) {
      alert("Vui lòng chọn thành viên!");
      return;
    }
  
    const newMember = {
      userId: selectedUser.value,
      projectId: projectId,
      isOwner: isOwner,
      role: data.role,
      memberId: selectedUser.value, // Ensure this matches the expected format
    };
  
    console.log("Submitting payload:", newMember); // Debugging line
  
    await addMember(newMember, {
      onSuccess: (response) => {
        console.log("API response:", response); // Debugging line
        reset(); // Reset form after success
        setOpen(false); // Close modal
      },
    });
    
  };
  

  if (isLoading) return <div>Loading...</div>;

  return (
    <ModalWrapper open={open} setOpen={setOpen}>
      <form onSubmit={handleSubmit(handleOnSubmit)} className="">
        <DialogTitle
          as="h2"
          className="text-base font-bold leading-6 text-gray-900 mb-4"
        >
          {userData ? "CẬP NHẬT THÔNG TIN" : "THÊM THÀNH VIÊN"}
        </DialogTitle>
        <div className="mt-2 flex flex-col gap-6">
          <Select
            options={users.map((user) => ({
              value: user.id,
              label: user.userName,
            }))}
            onChange={(option) => setSelectedUser(option)}
            value={selectedUser}
            placeholder="Chọn thành viên"
            isClearable
          />
          <Textbox
            placeholder="Vai trò trong dự án"
            type="text"
            name="role"
            label="Vai trò"
            className="w-full rounded"
            register={register("role", {
              required: "Vui lòng nhập vai trò!",
            })}
            error={errors.role ? errors.role.message : ""}
          />
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={isOwner}
              onChange={(e) => setIsOwner(e.target.checked)}
              className="form-checkbox"
            />
            <span>Quản lý dự án</span>
          </label>
        </div>
        <div className="py-3 mt-4 sm:flex sm:flex-row-reverse space-x-4">
          <Button
            type="submit"
            className="bg-mainColor px-8 text-sm font-semibold text-neutral-800 hover:bg-mainBg sm:w-auto rounded-lg"
            label="Thêm"
          />
          <Button
            type="button"
            className="bg-white hover:bg-neutral-200 px-5 text-sm font-semibold text-gray-700 sm:w-auto rounded-lg"
            onClick={() => setOpen(false)}
            label="Huỷ"
          />
        </div>
      </form>
    </ModalWrapper>
  );
}

export default AddMember;
