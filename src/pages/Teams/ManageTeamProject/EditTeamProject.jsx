import React, { useEffect ,useState} from "react";
import { FaArrowLeft, FaAsterisk } from "react-icons/fa";
import { Form, Input, Select } from "antd";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import TeamSidebar from "../../../components/Sidebar/TeamSidebar";
import Loading from "../../../components/Loading/Loading";
import { ALL_TEAM_PROJECTS } from "../../../routes/constant";
import Button from "../../../components/Button";
import { useGetProjectById, useUpdateProject } from "../../../api/projectApi";
import { useGetAllUser } from "../../../api/userApi";

const { TextArea } = Input;

function EditTeamProject() {
  const navigate = useNavigate();
  const { id: projectId } = useParams();
  const [form] = Form.useForm();

  const { data: projectDetail, isLoading: isProjectLoading } = useGetProjectById(projectId);
  const updateProjectMutation = useUpdateProject();
  const { data: users = [], isLoading: isUsersLoading } = useGetAllUser();

  useEffect(() => {
    window.scrollTo(0, 0);
    if (projectDetail) {
      form.setFieldsValue(projectDetail);
    }
  }, [projectDetail, form]);

  const handleUpdateProject = (values) => {
    const payload = {
      name: values.name,
      description: values.description,
      typeOfSpace: values.typeOfSpace,
      nameLeader: values.nameLeader,
      status: 1,
      isGroup: true,
    };

    updateProjectMutation.mutate(
      { projectId, payload },
      {
        onSuccess: () => {
          navigate(`/${ALL_TEAM_PROJECTS}`);
        },
        onError: (error) => {
          console.error("Error updating project:", error);
        },
      }
    );
  };

  if (isProjectLoading || isUsersLoading) {
    return <Loading loading={isProjectLoading || isUsersLoading} />;
  }

  return (
    <div className="flex">
      <TeamSidebar />
      <div className="mt-6 mx-12 md:mx-48 wrapper-body">
        <div>
          <p className="pb-2 text-xl font-semibold border-b border-neutral-900">
            Chỉnh sửa không gian làm việc của nhóm
          </p>
          <p className="mb-1">
            Điều chỉnh không gian làm việc của nhóm để tối ưu hóa sự thoải mái, sáng tạo và hiệu suất.
          </p>
        </div>

        <div className="mb-4 px-5 py-2 md:mx-24">
          <Form
            form={form}
            layout="vertical"
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
                { required: true, message: "Vui lòng nhập tên không gian làm việc" },
                { min: 10, message: "Tên không gian làm việc phải ít nhất 10 kí tự" },
              ]}
            >
              <Input placeholder="Dự án của bạn" />
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
              style={{ width: "300px" }}
            >
              <Input placeholder="vd: thiết kế, marketing,..." />
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
              <Select
                options={users.map((user) => ({
                  value: user.userName,
                  label: user.userName,
                }))}
                placeholder="Nhập tên leader"
                isMulti
              />
            </Form.Item>

            <Form.Item label="Mô tả không gian làm việc" name="description">
              <TextArea
                rows={4}
                placeholder="Nhóm của chúng tôi tổ chức mọi thứ ở đây..."
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
  );
}

export default EditTeamProject;
