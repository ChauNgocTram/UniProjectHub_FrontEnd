import React, { useContext, useEffect, useState } from "react";
import { Button, Input, Form } from "antd";
import { FaAsterisk } from "react-icons/fa";
import axios from "axios";
const { Search } = Input;

import { multiStepContext } from "../StepperContext";
import api from "../../../../../../config/axios";
import { alert } from "../../../../../../components/Alert/Alert";
import Loading from "../../../../../../components/Loading/Loading";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../../../../../redux/features/userSlice";

//const { Option } = Select;

import Select from "react-select";
import chroma from "chroma-js";


function SecondStep() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const { setCurrentStep, userData, setUserData } = useContext(multiStepContext);
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  const ownerId = user.userId;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/api/admin/users');
        if (Array.isArray(response.data)) {
          setUsers(response.data);
        } else {
          console.error("Expected an array of users, received:", response.data);
        }
      } catch (error) {
        console.error("Error fetching users", error);
        console.log("Error response data:", error.response.data); 
      }
    };
  
    fetchUsers();
  }, []);
  
  const handleBtnClick = async () => {
    setLoading(true);
    try {
      const payload = {
        name: userData.name,
        description: userData.description,
        typeOfSpace: userData.typeOfSpace,
        nameLeader: userData.nameLeader,
        img: null,
        status: 1,
        isGroup: true,
        members: selectedUsers.map(userId => ({ userId })),
      };

      const response = await api.post(
        `/api/Project/CreateProject/${ownerId}`,
        payload
      );
      console.log("Create task response:", response);
      if (response.status === 200) {
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
    setSearchValue(value);
  };


  const handleUserSelect = (selectedOptions) => {
    setSelectedUsers(selectedOptions);
  };

  const filteredUsers = users.filter(user =>
    user.userName.toLowerCase().includes(searchValue.toLowerCase())
  );

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
            rules={[
              { required: true, message: "Vui lòng nhập tên leader của dự án" },
            ]}
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
            style={{ width: "300px" }}
          >
            {/* <Select
              mode="multiple"
              placeholder="Tìm kiếm thành viên..."
              onSearch={handleSearch}
              onChange={handleUserSelect}
              style={{ width: "100%" }}
              filterOption={false}
            >
              {filteredUsers.map((user) => (
                <Option key={user.id} value={user.id}>
                  {user.userName}
                </Option>
              ))}
            </Select> */}
 <Select
      options={users.map(user => ({
        value: user.id,
        label: user.userName
      }))}
      onChange={handleUserSelect}
      value={selectedUsers}
      placeholder="Tìm kiếm thành viên"
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
                loading={loading}
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
