import React from "react";
import intro from "../../assets/video/intro.mp4";
import { NavLink } from "react-router-dom";
import { Button, Checkbox, Form, Input } from "antd";
import { FaAsterisk } from "react-icons/fa";
import Swal from "sweetalert2";
import { REGISTER_PAGE } from "../../routes/constant";

const onFinish = (values) => {
  console.log("Success:", values);
};
const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

function Login() {
  const formItemLayout = {
    labelCol: { xs: { span: 10 }, sm: { span: 9 } },
    wrapperCol: { xs: { span: 10 }, sm: { span: 8 } },
  };

  const handleForgetPassword = () => {
    Swal.fire({
      title: `Bạn quên mật khẩu?`,
      html: `Vui lòng nhập Email bạn đã đăng ký`,
      input: "email",
      inputAttributes: {
        autocapitalize: "off",
      },
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonText: "Xác nhận",
      cancelButtonText: "Huỷ",
      allowOutsideClick: false,
    });
  };

  return (
    <>
      <div className="bg-mainBg h-screen -mb-14 pb-0">
        <main className="pt-2">
          <div
            className="relative w-full max-w-[1020px] h-auto bg-white rounded-[3.3rem] mx-auto mt-12"
            style={{ height: "80vh" }}
          >
            <div className="inner-box flex justify-center items-center">
              <div className="h-[75%] w-full m-auto flex justify-between rounded-xl p-0">
                
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
                      Đăng nhập
                    </h2>
                    <p className="text-white p-4 font-normal py-2">
                      UniProjectHub - Leading the Pulse of Innovation
                    </p>
                  </div>

                  <div className="absolute flex bottom-3 px-4 h-16 bg-white bg-opacity-[0.248] left-2 right-2 justify-between items-center rounded-xl filter">
                    <span className="text-white">Bạn mới biết đến UniProjectHub?</span>
                    <NavLink  to={`/auth/${REGISTER_PAGE}`}>
                      <button className="rounded-lg py-3 px-4 bg-white font-semibold hover:bg-hoverBtn hover:translate-x-1  transition duration-200">
                        Đăng kí
                      </button>
                    </NavLink>
                  </div>
                </div>

                <div className="w-1/2 flex items-center justify-center">
                  <div className="w-full px-4">
                    <Form
                      {...formItemLayout}
                      initialValues={{
                        remember: true,
                      }}
                      onFinish={onFinish}
                      onFinishFailed={onFinishFailed}
                      size="large"
                      autoComplete="off"
                      wrapperCol={{
                        span: 24,
                      }}
                    >
                      <div className="flex flex-col md:flex-row items-start justify-between">
                        <p className="w-full md:w-5/12 p-0 m-0 px-2 pt-2 flex items-center">
                          <span className="text-red-600 px-1">
                            <FaAsterisk size={6} />
                          </span>
                          <span>Email:</span>
                        </p>
                        <Form.Item
                          // label="Email"
                          className="mx-0 px-0 w-full"
                          name="email"
                          rules={[
                            {
                              required: true,
                              message: "Vui lòng nhập email!",
                            },
                          ]}
                        >
                          <Input
                            style={{ width: "100%" }}
                            placeholder="Nhập email"
                          />
                        </Form.Item>
                      </div>

                      <div className="flex flex-col md:flex-row items-start justify-between">
                        <p className="w-full md:w-5/12 p-0 m-0 px-2 pt-2 flex items-center">
                          <span className="text-red-600 px-1">
                            <FaAsterisk size={6} />
                          </span>
                          <span>Mật khẩu:</span>
                        </p>
                        <Form.Item
                          //label="Mật khẩu"
                          className="mx-0 px-0 w-full "
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
                        >
                          <Input.Password
                            style={{ width: "100%" }}
                            placeholder="Nhập mật khẩu"
                          />
                        </Form.Item>
                      </div>

                      <button
                        className="bg-black text-white text-xl p-2 mx-4 w-[430px] rounded-lg tracking-wide
                          font-bold focus:outline-none focus:shadow-outline hover:bg-hoverBtn hover:text-black
                          shadow-lg mt-3 pt-1"
                      >
                        Đăng nhập
                      </button>

                      <div className="text-center mt-3">
                        <NavLink
                          onClick={handleForgetPassword}
                          className="mt-3 text-center font-semibold italic"
                        >
                          Quên mật khẩu?
                        </NavLink>
                      </div>
                    </Form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default Login;
