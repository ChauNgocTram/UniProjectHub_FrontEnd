import React, { useContext, useState } from "react";
import { Button, Form } from "antd";
import { FaAsterisk } from "react-icons/fa";
import Loading from "../../../../../../components/Loading/Loading";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../../../../../redux/features/userSlice";
import { useCreateGroupProject } from "../../../../../../api/projectApi";
import Select from "react-select";
import { multiStepContext } from "../StepperContext";
import { useGetAllUser } from "../../../../../../api/userApi";

function SecondStep() {
  const user = useSelector(selectUser);
  const { setCurrentStep, userData, setUserData } =
    useContext(multiStepContext);
  const [loading, setLoading] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);
 
  const ownerId = user.userId;
  const { mutate: createGroupProject, isLoading: isCreating } =
    useCreateGroupProject();
  const { data: users, isLoading: isUsersLoading } = useGetAllUser();

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
        members: selectedUsers.map((user) => ({ userId: user.value })),
      };
      await createGroupProject({ ownerId, payload });
    } catch (error) {
      console.error("Error creating group project", error);
    }
    setLoading(false);
    setCurrentStep(3);
  };

  const handleNameLeaderChange = (selectedOption) => {
    if (selectedOption) {
      setUserData({ ...userData, nameLeader: selectedOption.value });
    }
  };

  const handleUserSelect = (selectedOptions) => {
    setSelectedUsers(selectedOptions);
  };

  const validateMembers = (_, value) => {
    const leaderUsername = userData.nameLeader;
    if (!value || !leaderUsername) {
      return Promise.resolve();
    }
    const selectedUsernames = value.map((user) => user.label);
    if (selectedUsernames.includes(leaderUsername)) {
      return Promise.resolve();
    }
    return Promise.reject(new Error("Danh sách thành viên phải bao gồm tên leader."));
  };

  if (isUsersLoading || loading || isCreating) {
    return <Loading />;
  }

  return (
    <>
      {loading || isCreating ? (
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
            <Select
              options={users.map((user) => ({
                value: user.userName,
                label: user.userName,
              }))}
              onChange={handleNameLeaderChange}
              value={
                users.find((user) => user.userName === userData.nameLeader) ||
                null
              }
              placeholder="Nhập tên leader"
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
            style={{ width: "500px" }}
            rules={[{ validator: validateMembers }]}
          >
            <Select
              options={users.map((user) => ({
                value: user.id,
                label: user.userName,
              }))}
              onChange={handleUserSelect}
              value={selectedUsers}
              placeholder="Tìm kiếm thành viên"
              isMulti
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
