import React, { useContext } from "react";
import { Button, Input, Select, Form } from "antd";
import { FaAsterisk } from "react-icons/fa";
import { multiStepContext } from "../StepperContext";

const { Option } = Select;
const { TextArea } = Input;

function FirstStep() {
  const { setCurrentStep, userData, setUserData } =
    useContext(multiStepContext);

  const handleInputChange = (e, key) => {
    setUserData({ ...userData, [key]: e.target.value });
  };


  const handleSubmit = () => {
    setCurrentStep(2);
  };

  return (
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
          { required: true, message: "Vui lòng nhập tên không gian làm việc" },
          { min: 10, message: "Tên không gian làm việc phải ít nhất 10 kí tự" },
        ]}
        initialValue={userData.name}
      >
        <Input
          placeholder="Dự án của bạn"
          value={userData.name}
          onChange={(e) => handleInputChange(e, "name")}
        />
      </Form.Item>

      <Form.Item
        label={
          <span className="flex items-center">
            <FaAsterisk size={6} className="text-red-600 px-1" />
            Danh mục
          </span>
        }
        name="typeOfSpace"
        rules={[
          { required: true, message: "Vui lòng nhập tên danh mục" },
        ]}
        initialValue={userData.typeOfSpace}
        style={{ width: "300px" }}
      >
         <Input
          placeholder="vd: thiết kế, marketing,..."
          value={userData.name}
          onChange={(e) => handleInputChange(e, "name")}
        />
        {/* <Select
          placeholder="Chọn..."
          value={userData.typeOfSpace}
          onChange={(value) => handleSelectChange(value, "typeOfSpace")}
        >
          <Option value={0}>Nhân sự</Option>
          <Option value={1}>Marketing</Option>
          <Option value={2}>Giáo dục</Option>
          <Option value={3}>Công nghệ</Option>
          <Option value={4}>Tài chính</Option>
        </Select> */}
      </Form.Item>

      <Form.Item
        label="Mô tả không gian làm việc"
        name="description"
        rules={[
          { required: true, message: "Vui lòng mô tả không gian làm việc" },
          { min: 10, message: "Mô tả phải tối thiểu 10 kí tự" },
        ]}
        initialValue={userData.description}
      >
        <TextArea
          rows={5}
          placeholder="Nhóm của chúng tôi tổ chức mọi thứ ở đây..."
          value={userData.description}
          onChange={(e) => handleInputChange(e, "description")}
        />
      </Form.Item>

      <Form.Item>
        <div className="flex justify-center">
          <Button
            type="primary"
            htmlType="submit"
            className="bg-mainColor px-2 mx-4 rounded-lg tracking-wide focus:outline-none focus:shadow-outline shadow-lg"
          >
            Tiếp tục
          </Button>
        </div>
      </Form.Item>
    </Form>
  );
}

export default FirstStep;
