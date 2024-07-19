import React, { useEffect, useState } from "react";
import { FaArrowLeft, FaAsterisk } from "react-icons/fa";
import { Form, Input, Select } from "antd";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import TeamSidebar from "../../../components/Sidebar/TeamSidebar";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../../redux/features/userSlice";
import api from "../../../config/axios";
import Loading from "../../../components/Loading/Loading";
import { alert } from "../../../components/Alert/Alert";
import { ALL_TEAM_PROJECTS } from "../../../routes/constant";
import Button from "../../../components/Button";

const { Option } = Select;
const { TextArea } = Input;

function EditTeamProject() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id: projectId } = useParams();
  const [projectDetail, setProjectDetail] = useState(null);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const getProjectById = async () => {
    setLoading(true);
    try {
      const response = await api.get(
        `/api/Project/GetProjectById/${projectId}`
      );
      if (response.data) {
        setProjectDetail(response.data);
        setLoading(false);
        form.setFieldsValue(response.data);
      }
    } catch (error) {
      console.error("Error fetching request:", error);
      setLoading(false);
    }
  };

  const handleUpdateProject = async () => {
    setLoading(true);
    try {
      const payload = {
        name: projectDetail?.name,
        description: projectDetail?.description,
        typeOfSpace: projectDetail?.typeOfSpace,
        nameLeader: projectDetail?.nameLeader,
        status: 1,
        isGroup: true,
      };

      const response = await api.put(
        `/api/Project/UpdateProject/${projectId}`,
        payload
      );

      if (response.status === 200) {
        alert.alertSuccessWithTime(
          "Cập nhật dự án thành công!",
          "",
          2000,
          "25",
          () => {}
        );
        navigate(`/${ALL_TEAM_PROJECTS}`);
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
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    getProjectById();
  }, [projectId]);

  const handleInputChange = (e, key) => {
    setProjectDetail({ ...projectDetail, [key]: e.target.value });
  };

  const handleSelectChange = (value, key) => {
    setProjectDetail({ ...projectDetail, [key]: value });
  };

  return (
    <>
      {loading ? (
        <Loading loading={loading} />
      ) : (
        <div className="flex">
          <TeamSidebar />
          <div className="mt-6 mx-12 md:mx-48 wrapper-body">
            
            <div>
              <p className="pb-2 text-xl font-semibold border-b border-neutral-900">
                Chỉnh sửa không gian làm việc của nhóm
              </p>
              <p className="mb-1">
                Điều chỉnh không gian làm việc của nhóm để tối ưu hóa sự thoải
                mái, sáng tạo và hiệu suất.
              </p>
            </div>

            <div className="mb-4 px-5 py-2 md:mx-24">
              <Form
                form={form}
                layout="vertical"
                initialValues={projectDetail || {}}
                onFinish={handleUpdateProject}
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
                >
                  <Input
                    placeholder="Dự án của bạn"
                    value={projectDetail?.name}
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
                    value={projectDetail?.typeOfSpace}
                    onChange={(value) =>
                    handleSelectChange(value, "typeOfSpace")
                    }
                  >
                    <Option value={0}>Nhân sự</Option>
                    <Option value={1}>Marketing</Option>
                    <Option value={2}>Giáo dục</Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  label={
                    <span className="flex items-center">
                      <FaAsterisk size={6} className="text-red-600 px-1" />
                      Tên leader của dự án
                    </span>
                  }
                  name="nameLeader"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập tên leader của dự án",
                    },
                  ]}
                >
                  <Input
                    placeholder="Họ và tên của bạn"
                    value={projectDetail?.nameLeader}
                    onChange={(e) => handleInputChange(e, "nameLeader")}
                  />
                </Form.Item>

                <Form.Item label="Mô tả không gian làm việc" name="description">
                  <TextArea
                    rows={4}
                    placeholder="Nhóm của chúng tôi tổ chức mọi thứ ở đây..."
                    value={projectDetail?.description}
                    onChange={(e) => handleInputChange(e, "description")}
                  />
                </Form.Item>

                <Form.Item>
                  <div className="flex justify-center">
                    <Button
                      type="button"
                      className="bg-white hover:bg-neutral-200 border text-sm font-semibold text-gray-700 sm:w-auto rounded-lg"
                      onClick={() => navigate(`/${ALL_TEAM_PROJECTS}`)}
                      label="Huỷ"
                    />
                    <Button
                      label="Cập nhật"
                      type="submit"
                      className="bg-mainColor text-sm font-semibold text-neutral-800 hover:bg-mainBg sm:ml-3 sm:w-auto rounded-lg"
                    />
                  </div>
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default EditTeamProject;