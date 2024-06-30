import React, { useContext } from "react";
import { Button, Input, Select, Form } from "antd";
import { FaAsterisk } from "react-icons/fa";
const { Search } = Input;

import { multiStepContext } from "../StepperContext";
import api from "../../../../../../config/axios";
import { alert } from "../../../../../../components/Alert/Alert"
import { useState } from "react";

import Loading from "../../../../../../components/Loading/Loading"

function SecondStep() {
  const { setCurrentStep, userData, setUserData, submitData } =
    useContext(multiStepContext);
    const [loading, setLoading] = useState(false);
  // const handleBtnClick = () => {
  //   submitData();
  //   setCurrentStep(3);
  // };

  const handleBtnClick = async () => {
    setLoading(true);
    try {
      const payload = {
        name: userData.name,
        description: userData.description,
        typeOfSpace:userData.typeOfSpace,
        nameLeader: userData.nameLeader,
        status: 1,
        isGroup: true,
      };

      const response = await api.post(`/api/Project/CreateProject/cc405639-40d4-4094-b403-70422d74ca95`, payload);

      if (response.status === 200) {
        // alert.alertSuccessWithTime(
        //   "Tạo Task Thành Công",
        //   "",
        //   2000,
        //   "30",
        //   () => {}
        // );
        console.log("Create task response:", response.data);
      } else {
        console.error("Failed to create task", response.data);
        alert.alertFailed(
          "Tạo Task Thất Bại",
          "Vui lòng thử lại",
          2000,
          "30",
          () => {}
        );
      }
    } catch (error) {
      console.error("Error creating task", error);
    }
    setLoading(false);
    setCurrentStep(3);
  };


  const handleInputChange = (e, key) => {
    setUserData({ ...userData, [key]: e.target.value });
  };

  const handleSearch = (value) => {
    console.log("Search value:", value);
  };

  return (
    <>
    {loading ? (
      <Loading />
    ) : (
      <Form layout="vertical" onFinish={handleBtnClick}>
      <Form.Item
        label={
          <span className="flex items-center">
            <FaAsterisk size={6} className="text-red-600 px-1" />
            Tên leader của dự án
          </span>
        }
        name="nameLeader"
        // rules={[
        //   { required: true, message: "Vui lòng nhập tên leader của dự án" },
        // ]}
        initialValue={userData.nameLeader}
        className="w-[500px]"
      >
        <Input
          placeholder="Họ và tên của bạn"
          value={userData.nameLeader}
          onChange={(e) => handleInputChange(e, "nameLeader")}
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
        // rules={[
        //   {
        //     required: true,
        //     message: "Vui lòng nhập tên thành viên tham gia dự án",
        //   },
        // ]}
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
    )}
    </>
    
   
  );
}

export default SecondStep;
