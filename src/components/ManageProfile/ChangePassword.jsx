import React from "react";
import { useForm } from "react-hook-form";
import Textbox from "../Textbox";
import { Form, Input } from "antd";
import { FaAsterisk } from "react-icons/fa";

const onFinish = (values) => {
  console.log("Success:", values);
};
const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

function ChangePassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  return (
    <>
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 24,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <div className="space-y-12 pt-6 px-36">
          <div className="border-b border-slate-400 pb-12">
            <div className="mt-3 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

              <div className="flex flex-col md:flex-row items-start justify-between sm:col-span-6">
                <p className="w-full md:w-5/12 p-0 m-0 px-2 pt-2 flex items-center">
                  <span className="text-red-600 px-1">
                    <FaAsterisk size={6} />
                  </span>
                  <span>Mật khẩu hiện tại:</span>
                </p>
                <Form.Item
                  className="mx-0 px-0 w-full"
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập mật khẩu!",
                    },
                  ]}
                >
                  <Input.Password />
                </Form.Item>
              </div>

              <div className="flex flex-col md:flex-row items-start justify-between sm:col-span-6">
              <p className="w-full md:w-5/12 p-0 m-0 px-2 pt-2 flex items-center">
                  <span className="text-red-600 px-1">
                    <FaAsterisk size={6} />
                  </span>
                  <span>Mật khẩu mới:</span>
                </p>
                <Form.Item
                className="mx-0 px-0 w-full"
                  name="newpassword"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập mật khẩu!",
                    },
                  ]}
                >
                  <Input.Password />
                </Form.Item>
              </div>

              <div className="flex flex-col md:flex-row items-start justify-between sm:col-span-6">
              <p className="w-full md:w-5/12 p-0 m-0 px-2 pt-2 flex items-center">
                  <span className="text-red-600 px-1">
                    <FaAsterisk size={6} />
                  </span>
                  <span>Xác nhận mật khẩu mới:</span>
                </p>
                <Form.Item
                  className="mx-0 px-0 w-full"
                  name="confirm"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập mật khẩu!",
                    },
                  ]}
                >
                  <Input.Password />
                </Form.Item>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 px-36 pb-6 flex items-center justify-end gap-x-6">
          <button
            type="button"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Huỷ
          </button>
          <button
            type="submit"
            className="rounded-md bg-mainColor px-3 py-2 text-sm font-semibold text-neutral-800 shadow-sm hover:bg-mainBg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Cập nhật
          </button>
        </div>
      </Form>
    </>
  );
}

export default ChangePassword;
