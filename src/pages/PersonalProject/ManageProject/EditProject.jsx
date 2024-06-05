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
        <div className="mt-6 mx-12 md:mx-48 wrapper-body">
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

          <div className="my-4 p-5 md:mx-24">
            <Form
              layout="vertical"
              //</div>onFinish={handleSubmit}
            >
               <div className="mb-3">
                <label
                  htmlFor="photo"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Ảnh đại diện
                </label>
                <div className="mt-2 flex items-center gap-x-3">
                
                  <img src="" alt="" className="h-12 w-12 rounded-xl" />
                  <button
                    type="button"
                    className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  >
                    Thay đổi
                  </button>
                </div>
              </div>
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
                style={{ width: "300px" }}
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
