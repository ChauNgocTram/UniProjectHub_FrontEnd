import React, { useEffect } from "react";
import intro from "../../assets/video/intro.mp4";
import { NavLink, useNavigate, useNavigationType } from "react-router-dom";
import { Button, Checkbox, Form, Input } from "antd";
import { FaAsterisk } from "react-icons/fa";
import Swal from "sweetalert2";
import api from "../../config/axios";
import { signInWithPopup, GoogleAuthProvider, getAuth } from "firebase/auth";
import { REGISTER_PAGE } from "../../routes/constant";
import logo from "../../assets/images/logo.png";
import googleIcon from "../../assets/images/googleIcon.png";
import { useDispatch, useSelector } from "react-redux";
import { login, selectUser } from "../../redux/features/userSlice";
import { auth } from "../../config/firebase";
import { alert } from "../../components/Alert/Alert";
const provider = new GoogleAuthProvider();

const onFinish = (values) => {
  console.log("Success:", values);
};
const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

function Login() {
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLoginGoogle = async () => {
    const auth = getAuth();
    const result = await signInWithPopup(auth, provider);
    console.log(result);
    const token = result.user.accessToken;
    console.log(token);

    const res = await api.get("/api/account/login-google", { token });
    //  const role = res.data.role;

    console.log(res.data.role);
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("accountId", res.id);
    //save redux
    dispatch(login(res.data));
    navigate("/");
    // if (role === "ADMIN") {
    //   navigate("/dashboard");
    // }
    // if (role === "MOD") {
    //   navigate("/dashboard");
    // }
    // if (role === "CREATOR") {
    //   navigate("/creator-manage/artworks");
    // }
    // if (role === "AUDIENCE") {
    //   navigate("/profile");
    // }
  };

  const onFinish = async (value) => {
    try {
      const response = await api.post("/api/account/login", value);
      console.log(response.data);
      if (response.status === 200) {
        const user = response.data;
        console.log(user);

        localStorage.setItem("token", user.token);
        localStorage.setItem("userId", user.userId);

        dispatch(login(user));

        alert.alertSuccessWithTime(
          "Đăng nhập thành công",
          "",
          2000,
          "30",
          () => {}
        );

        navigate("/");
      }
    } catch (e) {
      console.log(e);
    }
  };

  // useEffect(() => {
  //   console.log(user);
  // }, [user]);

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

  const handleClick = () => {
    alert.alertSuccessWithTime(
      "Chào mừng bạn trở lại",
      "",
      2000,
      "30",
      () => {}
    );
    navigate("/");
  };

  return (
    <>
      <div className="bg-mainBg h-screen -mb-14 pb-0">
        <main className="pt-2 h-screen flex-1">
          <div
            className="relative md:w-full w-[70%] max-w-[1020px] h-auto bg-white rounded-2xl shadow-xl my-0 mx-auto mt-14"
            style={{ height: "80vh" }}
          >
            <div
              //  className="relative w-full max-w-[1020px] h-auto bg-white rounded-[3.3rem] mx-auto mt-12"
              className="absolute  inner-box inner-log-in flex justify-content-center"
              // style={{ height: "80vh" }}
            >
              <div
                //  className="inner-box flex justify-center items-center"
                className="h-[75vh] justify-between items-center rounded-xl px-0 pb-6 flex"
              >
                {/* <div className="h-[75%] w-full m-auto flex justify-between rounded-xl p-0"> */}
                <div className="videoDiv h-[500px] flex-1 lg:flex md:hidden sm:hidden">
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
                    <span className="text-white">
                      Bạn mới biết đến UniProjectHub?
                    </span>
                    <NavLink to={`/auth/${REGISTER_PAGE}`}>
                      <button className="rounded-lg py-3 px-4 bg-white font-semibold hover:bg-hoverBtn hover:translate-x-1  transition duration-200">
                        Đăng kí
                      </button>
                    </NavLink>
                  </div>
                </div>

                <div className="w-1/2 flex flex-1 items-center justify-center mx-auto">
                  <div className="md:w-full w-[90%] px-4 mx-auto">
                    <NavLink to="/" className="flex justify-center mb-6">
                      <img src={logo} alt="" width={100} />
                    </NavLink>
                    <Form
                      {...formItemLayout}
                      onFinish={onFinish}
                      onFinishFailed={onFinishFailed}
                      size="large"
                      autoComplete="off"
                      wrapperCol={{
                        span: 24,
                      }}
                    >
                      <div className="flex flex-col md:flex-row items-start justify-between">
                        <p className="w-full md:w-6/12 p-0 m-0 px-2 pt-2 flex items-center">
                          <span className="text-red-600 px-1">
                            <FaAsterisk size={6} />
                          </span>
                          <span>Tên người dùng:</span>
                        </p>
                        <Form.Item
                          // label="Email"
                          className="mx-0 px-0 w-full"
                          name="username"
                          rules={[
                            {
                              required: true,
                              message: "Vui lòng nhập tên!",
                            },
                          ]}
                        >
                          <Input
                            style={{ width: "100%" }}
                            placeholder="Nhập tên"
                          />
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

                      <div className="flex flex-col justify-center mx-auto md:w-full w-[80%]">
                        <button
                          type="submit"
                          //  onClick={handleClick}
                          className="bg-black text-white text-lg px-3 py-2 mx-auto w-full rounded-lg tracking-wider
                          font-bold focus:outline-none focus:shadow-outline hover:bg-hoverBtn hover:text-black
                          shadow-lg mt-3 "
                        >
                          Đăng nhập
                        </button>
                        <button
                          onClick={handleLoginGoogle}
                          className="flex justify-center items-center p-3 mx-auto my-4 md:w-[430px] w-[385px] shadow-lg border-neutral-300 border-2 focus:shadow-outline rounded-lg"
                        >
                          <img src={googleIcon} className="h-[20px] px-2" />
                          Sign in with Google
                        </button>

                        <div className="text-center mt-3">
                          <NavLink
                            onClick={handleForgetPassword}
                            className="mt-3 text-center font-semibold italic"
                          >
                            Quên mật khẩu?
                          </NavLink>
                        </div>
                      </div>
                    </Form>
                  </div>
                </div>
                {/* </div> */}
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default Login;
