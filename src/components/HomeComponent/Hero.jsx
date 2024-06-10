import React from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";
import hero from "../../assets/images/hero.jpg";
import { AiOutlineCaretRight } from "react-icons/ai";

function Hero() {
  const navigate = useNavigate();

  const handleConstructionQuotesClick = () => {
    // if (!isAuthenticated) {
    //   navigate("/auth");
    // } else {
    //   navigate("/quote-request");
    // }
    navigate("/")
  };
  return (
    <section className="h-full max-h-[640px] mb-32 md:mb-24 mt-32">
      <div className="flex flex-col lg:flex-row items-center justify-center ml-8">
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left justify-center flex-1 lg:pl-24 ml-8">
          <h1 className="lg:text-5xl text-3xl leading-3 mb-6 font-semibold space-y-4">
            <p className="text-mainColor tracking-wide mb-8 md:mb-1">
              UniProjectHub{" "}
              <span className="underline italic decoration-mainColor text-black">
                APN
              </span>
            </p>

            <p>
              <TypeAnimation
                sequence={[
                  "Dẫn đầu nhịp điệu đổi mới.",
                  2000,
                  "Dễ dàng làm quen, nhanh chóng làm chủ!",
                  4000,
                ]}
                wrapper="span"
                speed={50}
                style={{
                  display: "inline-block",
                  fontStyle: "italic",
                  fontSize: 30,
                }}
                repeat={Infinity}
                className="responsive-type-animation text-gray-700"
              />
            </p>
          </h1>
          <p className="max-w-[700px] mb-8 mt-4 text-justify tracking-normal">
            {" "}
            Nền tảng blockchain dựa trên Ethereum được thiết kế để cung cấp giải
            pháp đa dạng cho các ứng dụng tài chính phi tập trung (DeFi) và ứng
            dụng phi tập trung (DApps).
          </p>
          <div className="flex items-center gap-x-2">
            <button
              onClick={handleConstructionQuotesClick}
              className="flex items-center justify-center space-x-1 rounded-full px-3 py-2 text-sm text-white font-semibold bg-[#286A8E] hover:bg-base4 transition ease-out duration-300 transform hover:scale-110"
            >
              <p className="ml-1">Bắt đầu</p>
              <AiOutlineCaretRight size={17} />
            </button>

            <NavLink to="/houseProject">
              <button className="flex items-center justify-center space-x-1 rounded-full px-3 py-2  text-sm transition ease-out duration-300 transform hover:scale-110">
                <p>Cộng đồng</p>
                <AiOutlineCaretRight size={17} />
              </button>
            </NavLink>
          </div>
        </div>

        <div className="hidden flex-1 lg:flex justify-center items-end">
          <img
            src={hero}
            alt=""
            className="w-1/2  animate-floating rounded-full"
          />
        </div>
      </div>
    </section>
  );
}

export default Hero;
