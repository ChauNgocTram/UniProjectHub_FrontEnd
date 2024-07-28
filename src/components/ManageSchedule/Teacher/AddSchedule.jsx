import { DialogTitle } from "@headlessui/react";
import PropTypes from "prop-types"; // Import PropTypes
import { useForm } from "react-hook-form";
import { createSchedule } from "../../../api/scheduleApi"; // Adjust the import path as needed
import Button from "../../Button";
import ModalWrapper from "../../Modal/ModalWrapper";
import Textbox from "../../Textbox";

function AddSchedule({ open, setOpen }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Handler for form submission
  const submitHandler = async (data) => {
    // Convert the form data into the expected format for the API
    const scheduleData = {
      userId: "user-id-placeholder", // Replace with actual user ID or remove if not needed
      dateOfWeek: "", // You may need to adjust this based on your requirements
      startTime: data.startTime,
      endTime: data.endTime,
      slotStartTime: data.slotStartTime,
      slotEndTime: data.slotEndTime,
      courseName: data.title,
    };

    try {
      await createSchedule(scheduleData);
      setOpen(false); // Close the modal on successful creation
    } catch (error) {
      console.error("Error creating schedule:", error.message);
      // Optionally display an error message to the user
    }
  };

  return (
    <div className="my-12">
      <ModalWrapper open={open} setOpen={setOpen}>
        <form onSubmit={handleSubmit(submitHandler)}>
          <DialogTitle
            as="h2"
            className="text-base font-bold leading-6 text-gray-900 mb-4"
          >
            TẠO LỊCH
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
                required: "Location is required",
              })}
              error={errors.location ? errors.location.message : ""}
            />
            <Textbox
              placeholder="Date"
              type="datetime-local"
              name="startTime"
              label="Bắt đầu"
              className="w-full rounded"
              register={register("startTime", {
                required: "Start time is required",
              })}
              error={errors.startTime ? errors.startTime.message : ""}
            />
            <Textbox
              placeholder="Date"
              type="datetime-local"
              name="endTime"
              label="Kết thúc"
              className="w-full rounded"
              register={register("endTime", {
                required: "End time is required",
              })}
              error={errors.endTime ? errors.endTime.message : ""}
            />
            <Textbox
              placeholder="Date"
              type="datetime-local"
              name="slotStartTime"
              label="Slot Bắt đầu"
              className="w-full rounded"
              register={register("slotStartTime", {
                required: "Slot start time is required",
              })}
              error={errors.slotStartTime ? errors.slotStartTime.message : ""}
            />
            <Textbox
              placeholder="Date"
              type="datetime-local"
              name="slotEndTime"
              label="Slot Kết thúc"
              className="w-full rounded"
              register={register("slotEndTime", {
                required: "Slot end time is required",
              })}
              error={errors.slotEndTime ? errors.slotEndTime.message : ""}
            />
            <Textbox
              placeholder="Nhập mô tả"
              type="textarea"
              rows={2}
              name="description"
              label="Mô tả"
              className="w-full rounded"
              register={register("description", {
                required: "Description is required",
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
  );
}

// Add PropTypes validation
AddSchedule.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
};

export default AddSchedule;
