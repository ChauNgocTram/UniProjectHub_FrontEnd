import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Button, Form, Input } from "antd";
import { FaAsterisk } from "react-icons/fa";
import api from "../../config/axios";
import { alert } from "../../components/Alert/Alert";
import { LOGIN_PAGE } from "../../routes/constant";
import logo from "../../assets/images/logo.png";
import intro from "../../assets/video/intro.mp4";

const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

function Register() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setIsLoading(true);
    try {
      const response = await api.post("/api/account/register", {
        username: values.username,
        email: values.email,
        password: values.password,
      });
      if (response.status === 200) {
        alert.alertSuccessWithTime(
          "Đăng kí thành công",
          "Vui lòng kiểm tra email và xác nhận để kích hoạt tài khoản này",
          2000,
          "30",
          () => {}
        );
        navigate(`/auth/${LOGIN_PAGE}`);
      }
    } catch (error) {
      console.error("Error creating task", error);
      alert.alertFailed(
        "Đăng Kí Tài Khoản Thất Bại",
        "Vui lòng thử lại",
        2000,
        "30",
        () => {}
      );
    }
    setIsLoading(false);
  };

  const formItemLayout = {
    labelCol: { xs: { span: 10 }, sm: { span: 9 } },
    wrapperCol: { xs: { span: 10 }, sm: { span: 8 } },
  };

  return (
    <div className="bg-mainBg h-screen -mb-14 pb-0">
      <main className="pt-2">
        <div
          className="relative w-full max-w-[1020px] h-auto bg-white rounded-[3.3rem] mx-auto mt-12"
          style={{ height: "80vh" }}
        >
          <div className="inner-box flex justify-center items-center">
            <div className="h-[75%] w-full m-auto flex justify-between rounded-xl p-0">
              <div className="w-1/2 flex items-center justify-center">
                <div className="w-full px-4">
                  <div className="flex justify-center mb-6">
                    <img src={logo} alt="" width={100} />
                  </div>

                  <Form
                    {...formItemLayout}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    size="large"
                    autoComplete="off"
                    wrapperCol={{ span: 24 }}
                  >
                    <div className="flex flex-col md:flex-row items-start justify-between">
                      <p className="w-full md:w-6/12 p-0 m-0 px-2 pt-2 flex items-center">
                        <span className="text-red-600 px-1">
                          <FaAsterisk size={6} />
                        </span>
                        <span>Tên người dùng:</span>
                      </p>
                      <Form.Item
                        name="username"
                        rules={[
                          {
                            required: true,
                            message: "Vui lòng nhập tên!",
                          },
                        ]}
                        className="mx-0 px-0 w-full"
                      >
                        <Input style={{ width: "100%" }} placeholder="Nhập tên" />
                      </Form.Item>
                    </div>

                    <div className="flex flex-col md:flex-row items-start justify-between">
                      <p className="w-full md:w-6/12 p-0 m-0 px-2 pt-2 flex items-center">
                        <span className="text-red-600 px-1">
                          <FaAsterisk size={6} />
                        </span>
                        <span>Email:</span>
                      </p>
                      <Form.Item
                        name="email"
                        rules={[
                          {
                            required: true,
                            message: "Vui lòng nhập email!",
                          },
                        ]}
                        className="mx-0 px-0 w-full"
                      >
                        <Input style={{ width: "100%" }} placeholder="Nhập email" />
                      </Form.Item>
                    </div>

                    <div className="flex flex-col md:flex-row items-start justify-between">
                      <p className="w-full md:w-6/12 p-0 m-0 px-2 pt-2 flex items-center">
                        <span className="text-red-600 px-1">
                          <FaAsterisk size={6} />
                        </span>
                        <span>Mật khẩu:</span>
                      </p>
                      <Form.Item
                        name="password"
                        rules={[
                          {
                            required: true,
                            message: "Vui lòng nhập mật khẩu!",
                          },
                          {
                            min: 6,
                            message: "Mật khẩu phải có ít nhất 6 kí tự",
                          },
                        ]}
                        className="mx-0 px-0 w-full "
                      >
                        <Input.Password
                          style={{ width: "100%" }}
                          placeholder="Nhập mật khẩu"
                        />
                      </Form.Item>
                    </div>

                    <div className="flex flex-col md:flex-row items-start justify-between">
                      <p className="w-full md:w-6/12 p-0 m-0 px-2 pt-2 flex items-center">
                        <span className="text-red-600 px-1">
                          <FaAsterisk size={6} />
                        </span>
                        <span>Xác nhận mật khẩu:</span>
                      </p>
                      <Form.Item
                        name="password2"
                        dependencies={['password']}
                        hasFeedback
                        rules={[
                          {
                            required: true,
                            message: "Vui lòng xác nhận mật khẩu!",
                          },
                          ({ getFieldValue }) => ({
                            validator(_, value) {
                              if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                              }
                              return Promise.reject(
                                new Error('Mật khẩu xác nhận không khớp!')
                              );
                            },
                          }),
                        ]}
                        className="mx-0 px-0 w-full "
                      >
                        <Input.Password
                          style={{ width: "100%" }}
                          placeholder="Xác nhận mật khẩu"
                        />
                      </Form.Item>
                    </div>

                    <Form.Item wrapperCol={{ span: 24 }}>
                      <Button
                        type="primary"
                        htmlType="submit"
                        loading={isLoading}
                        className="bg-black text-white text-xl p-2 mx-4 w-[430px] rounded-lg tracking-wide font-bold focus:outline-none focus:shadow-outline hover:bg-hoverBtn hover:text-black shadow-lg mt-3 pt-1"
                      >
                        Đăng kí
                      </Button>
                    </Form.Item>
                  </Form>
                </div>
              </div>

              <div className="videoDiv h-[500px] lg:flex md:hidden sm:hidden">
                <video
                  className="absolute h-full w-full object-cover top-0 bottom-0 right-0 left-0"
                  src={intro}
                  autoPlay
                  muted
                  loop
                >
                  <source src={intro} type="video/mp4" />
                </video>

                <div className="relative py-2 bg-[#000000aa] bg-opacity-[0.248] rounded-xl">
                  <h2 className="text-white text-32 font-extrabold">
                    Đăng kí
                  </h2>
                  <p className="text-white p-4 font-normal py-2">
                    UniProjectHub - Leading the Pulse of Innovation
                  </p>
                </div>

                <div className="absolute flex bottom-3 px-4 h-16 bg-white bg-opacity-[0.248] left-2 right-2 justify-between items-center rounded-xl filter">
                  <span className="text-white">Bạn đã có tài khoản?</span>
                  <NavLink to={`/auth/${LOGIN_PAGE}`}>
                    <button className="rounded-lg py-3 px-4 bg-white font-semibold hover:bg-hoverBtn hover:translate-x-1 transition duration-200">
                      Đăng nhập
                    </button>
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Register;
