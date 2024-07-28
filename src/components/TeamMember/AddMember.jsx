import React, { useEffect, useState } from "react";
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
  const { mutate: addMember } = useAddMember(); // Get the mutation function

  // Define the form structure
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset, // To reset form after successful submission
  } = useForm({
    defaultValues: userData ?? { role: "" },
  });

  const handleOnSubmit = (formData) => {
    const newMember = {
      userId: selectedUser ? selectedUser.value : "", // Ensure userId is set
      projectId: projectId, // Pass the projectId
      isOwner: formData.isOwner === "true", // Convert string to boolean
      role: formData.role,
    };

    addMember(newMember, {
      onSuccess: () => {
        reset(); // Reset form after success
        setOpen(false); // Close modal
      },
    });
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
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
            {/* Optionally include a Textbox for name */}
            {/* <Textbox
              placeholder="Nhập họ và tên"
              type="text"
              name="name"
              label="Họ và tên"
              className="w-full rounded"
              register={register("name", {
                required: "Vui lòng nhập họ tên thành viên!",
              })}
              error={errors.name ? errors.name.message : ""}
            /> */}
            {/* Add a checkbox or another method to capture 'isOwner' */}
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                {...register("isOwner")}
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
    </>
  );
}

export default AddMember;
