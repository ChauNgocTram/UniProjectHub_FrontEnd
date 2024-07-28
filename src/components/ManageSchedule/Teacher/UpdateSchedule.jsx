import { DialogTitle } from "@headlessui/react";
import PropTypes from "prop-types";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { updateSchedule } from "../../../api/scheduleApi";
import Button from "../../../components/Button";
import ModalWrapper from "../../../components/Modal/ModalWrapper";
import Textbox from "../../../components/Textbox";

const UpdateSchedule = ({ open, setOpen, scheduleId, initialData }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: initialData, // Khởi tạo giá trị mặc định từ dữ liệu lịch trình ban đầu
  });

  useEffect(() => {
    // Reset form khi mở modal với dữ liệu mới
    reset(initialData);
  }, [initialData, open, reset]);

  // Handler cho việc gửi dữ liệu cập nhật
  const submitHandler = async (data) => {
    const updatedData = {
      ...data, // Sao chép dữ liệu từ form
      userId: "user-id-placeholder", // Thay thế bằng ID người dùng thực tế nếu cần
    };

    try {
      await updateSchedule({ scheduleId, scheduleData: updatedData });
      setOpen(false); // Đóng modal sau khi cập nhật thành công
    } catch (error) {
      console.error("Error updating schedule:", error.message);
      // Hiển thị thông báo lỗi nếu cần
    }
  };

  return (
    <ModalWrapper open={open} setOpen={setOpen}>
      <form onSubmit={handleSubmit(submitHandler)}>
        <DialogTitle
          as="h2"
          className="text-base font-bold leading-6 text-gray-900 mb-4"
        >
          CẬP NHẬT LỊCH TRÌNH
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
              label="Cập nhật"
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
  );
};

// Thêm PropTypes để kiểm tra kiểu dữ liệu của các props
UpdateSchedule.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  scheduleId: PropTypes.string.isRequired,
  initialData: PropTypes.object.isRequired, // Đối tượng chứa dữ liệu lịch trình ban đầu
};

export default UpdateSchedule;
