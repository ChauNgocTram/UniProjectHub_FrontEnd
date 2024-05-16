import React from "react";
import { FaAsterisk } from "react-icons/fa";
import { Button, Form, Input, Select } from "antd";
import PersonalSidebar from "../../../components/Sidebar/PersonalSidebar";

const { Option } = Select;
const { TextArea } = Input;

function CreateProject() {
  return (
    <>
      <div className="flex">
        <PersonalSidebar/>
        <div className="w-full mt-8">
          <div>
            <p className="pb-2 text-xl font-semibold border-b border-neutral-900">
              Hãy xây dựng một Không gian làm việc
            </p>
            <p className="my-3">
              Tăng năng suất của bạn bằng cách giúp mọi người dễ dàng truy cập
              bảng ở một vị trí.
            </p>
          </div>

          <div>
            <Form layout="vertical" 
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
