import React, { useState } from "react";
import { FaAsterisk } from "react-icons/fa";
import { Button, Form, Input, Select } from "antd";
import PersonalSidebar from "../../../components/Sidebar/PersonalSidebar";
import { useSelector } from "react-redux";
import { selectUser } from "../../../redux/features/userSlice";
import { alert } from "../../../components/Alert/Alert";
import { ALL_PERSONAL_PROJECTS } from "../../../routes/constant";
import { useCreateGroupProject } from "../../../api/projectApi"; 
import { useNavigate } from "react-router-dom";

const { Option } = Select;
const { TextArea } = Input;

function CreateProject() {
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const { mutate: createProject, isLoading } = useCreateGroupProject();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    typeOfSpace: "",
  });

  const handleInputChange = (e, name) => {
    setFormData((prev) => ({ ...prev, [name]: e.target.value }));
  };

  const handleSelectChange = (value, name) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        ...formData,
        ownerId: user.userId,
        status: 1,
        isGroup: false,
      };

      await createProject({ ownerId: user.userId, payload });

      alert.alertSuccessWithTime(
        "Tạo dự án thành công!",
        "",
        2000,
        "25",
        () => {}
      );
      navigate(`/${ALL_PERSONAL_PROJECTS}`);
    } catch (error) {
      console.error("Error creating project", error);
      alert.alertFailed(
        "Tạo Dự Án Thất Bại",
        "Vui lòng thử lại",
        2000,
        "30",
        () => {}
      );
    }
  };

  return (
    <>
      <div className="flex">
        <PersonalSidebar />
        <div className="mt-12 mx-12 md:mx-48 wrapper-body">
          <div>
            <p className="pb-2 text-xl font-semibold border-b border-neutral-900">
              Hãy xây dựng một Không gian làm việc
            </p>
            <p className="my-3">
              Tăng năng suất của bạn bằng cách giúp mọi người dễ dàng truy cập
              bảng ở một vị trí.
            </p>
          </div>

          <div className="my-4 p-5 md:mx-24">
            <Form layout="vertical" onFinish={handleSubmit}>
              <Form.Item
                label={
                  <span className="flex items-center">
                    <FaAsterisk size={6} className="text-red-600 px-1" />
                    Tên không gian làm việc
                  </span>
                }
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập tên không gian làm việc",
                  },
                ]}
              >
                <Input
                  placeholder="Dự án của bạn"
                  value={formData.name}
                  onChange={(e) => handleInputChange(e, "name")}
                />
              </Form.Item>

              <Form.Item
                label={
                  <span className="flex items-center">
                    <FaAsterisk size={6} className="text-red-600 px-1" />
                    Loại không gian làm việc
                  </span>
                }
                name="typeOfSpace"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng chọn loại không gian làm việc",
                  },
                ]}
                style={{ width: "300px" }}
              >
                <Select
                  placeholder="Chọn..."
                  value={formData.typeOfSpace}
                  onChange={(value) => handleSelectChange(value, "typeOfSpace")}
                >
                  <Option value={0}>Nhân sự</Option>
                  <Option value={1}>Marketing</Option>
                  <Option value={2}>Giáo dục</Option>
                </Select>
              </Form.Item>

              <Form.Item label="Mô tả không gian làm việc" name="description">
                <TextArea
                  rows={4}
                  placeholder="Nhóm của chúng tôi tổ chức mọi thứ ở đây..."
                  value={formData.description}
                  onChange={(e) => handleInputChange(e, "description")}
                />
              </Form.Item>

              <Form.Item>
                <div className="flex justify-center">
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={isLoading}
                    className="bg-mainColor px-2 mx-4 rounded-lg tracking-wide focus:outline-none focus:shadow-outline shadow-lg"
                  >
                    Tạo dự án
                  </Button>
                </div>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateProject;
