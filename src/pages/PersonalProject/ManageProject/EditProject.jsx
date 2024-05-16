import React from "react";
import { FaArrowLeft, FaAsterisk } from "react-icons/fa";
import { Button, Form, Input, Select } from "antd";
import PersonalSidebar from "../../../components/Sidebar/PersonalSidebar";
import { NavLink } from "react-router-dom";

const { Option } = Select;
const { TextArea } = Input;

function EditProject() {
  return (
    <>
      <div className="flex">
        <PersonalSidebar />
        <div className="w-full mt-8">
          <div className="my-3">
            <NavLink to="" onClick={() => window.history.back()}>
              <div className="flex items-center space-x-2 text-green-600 hover:text-green-400">
                <FaArrowLeft />
                <span>Trở về</span>
              </div>
            </NavLink>
          </div>
          <div>
            <p className="pb-2 text-xl font-semibold border-b border-neutral-900">
              Chỉnh sửa không gian làm việc của bạn
            </p>
            <p className="my-3">
              Điều chỉnh không gian làm việc của bạn để tối ưu hóa sự thoải mái,
              sáng tạo và hiệu suất.
            </p>
          </div>

          <div>
            <Form
              layout="vertical"
              //</div>onFinish={handleSubmit}
            >
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
                //initialValue={userData.name}
              >
                <Input
                  placeholder="Dự án của bạn"
                  //  value={userData.name}
                  //  onChange={(e) => handleInputChange(e, "name")}
                />
              </Form.Item>

              <Form.Item
                label={
                  <span className="flex items-center">
                    <FaAsterisk size={6} className="text-red-600 px-1" />
                    Loại không gian làm việc
                  </span>
                }
                name="type"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng chọn loại không gian làm việc",
                  },
                ]}
                // initialValue={userData.type}
              >
                <Select
                  placeholder="Chọn..."
                  // value={userData.type}
                  //  onChange={(value) => handleSelectChange(value, "type")}
                >
                  <Option value={0}>Nhân sự</Option>
                  <Option value={1}>Marketing</Option>
                  <Option value={2}>Giáo dục</Option>
                </Select>
              </Form.Item>

              <Form.Item
                label="Mô tả không gian làm việc"
                name="description"
                // initialValue={userData.description}
              >
                <TextArea
                  rows={4}
                  placeholder="Nhóm của chúng tôi tổ chức mọi thứ ở đây..."
                  //  value={userData.description}
                  //   onChange={(e) => handleInputChange(e, "description")}
                />
              </Form.Item>

              <Form.Item>
                <div className="flex justify-center">
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="bg-mainColor px-2 mx-4 rounded-lg tracking-wide focus:outline-none focus:shadow-outline shadow-lg"
                  >
                    Cập nhật
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

export default EditProject;
