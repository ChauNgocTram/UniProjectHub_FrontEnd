import React, { useContext } from "react";
import { Button, Input, Select, Form } from "antd";
import { FaAsterisk } from "react-icons/fa";
const { Search } = Input;

import { multiStepContext } from "../StepperContext";

function SecondStep() {
  const { setCurrentStep, userData, setUserData, submitData } =
    useContext(multiStepContext);

  const handleBtnClick = () => {
    submitData();
    setCurrentStep(3);
  };

  const handleInputChange = (e, key) => {
    setUserData({ ...userData, [key]: e.target.value });
  };

  const handleSearch = (value) => {
    console.log("Search value:", value);
  };

  return (
    <Form layout="vertical" onFinish={handleBtnClick}>
      <Form.Item
        label={
          <span className="flex items-center">
            <FaAsterisk size={6} className="text-red-600 px-1" />
            Tên leader của dự án
          </span>
        }
        name="username"
        rules={[
          { required: true, message: "Vui lòng nhập tên leader của dự án" },
        ]}
        initialValue={userData.username}
        className="w-[500px]"
      >
        <Input
          placeholder="Họ và tên của bạn"
          value={userData.username}
          onChange={(e) => handleInputChange(e, "username")}
        />
      </Form.Item>

      <Form.Item
        label={
          <span className="flex items-center">
            <FaAsterisk size={6} className="text-red-600 px-1" />
            Tên thành viên tham gia dự án
          </span>
        }
        name="members"
        rules={[
          {
            required: true,
            message: "Vui lòng nhập tên thành viên tham gia dự án",
          },
        ]}
        style={{ width: '300px' }}
      >
        <Search
          placeholder="Tìm kiếm thành viên..."
          onSearch={handleSearch}
          style={{ width: "100%" }}
        />
      </Form.Item>

      <Form.Item>
        <div className="flex justify-center">
          <Button
            type="default"
            onClick={() => setCurrentStep(1)}
            className="bg-slate-400 text-white border-2 border-slate-100 hover:bg-slate-700 hover:text-white transition duration-200 ease-in-out px-2 mx-4 rounded-lg tracking-wide focus:outline-none focus:shadow-outline shadow-lg "
          >
            Quay lại
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            className="bg-mainColor px-2 mx-4 rounded-lg tracking-wide focus:outline-none focus:shadow-outline shadow-lg "
          >
            Tạo nhóm
          </Button>
        </div>
      </Form.Item>
    </Form>
  );
}

export default SecondStep;
