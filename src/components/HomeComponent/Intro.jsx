import React, { useState }  from "react";
import { IoMdArrowDropright, IoIosArrowUp } from "react-icons/io";

function Intro() {
  return (
    <>
      <div className="relative overflow-hidden bg-[#f1fdfe] lg:py-5 py-8">
        <div className="xl:w-[1200px] mx-auto px-4 pb-2">
          <section className="lg:flex justify-between items-center relative my-4 p-6 gap-8">

            <div className=" lg:py-0 py-10 mr-24 sm:mx-auto px-12 my-8">
              <p className="text-black">UNIPROJECTHUB</p>
              <h1 className="text-[#286A8E] lg:text-4xl text-xl font-semibold pt-4 pb-6">
                Câu chuyện thương hiệu
              </h1>
              <p className="text-black leading-8 text-justify">
                Với những bạn mới bắt đầu, thật không dễ dàng để vừa làm quen
                với các công đoạn của một dự án, vừa làm quen với cách sử dụng
                của một ứng dụng quản lý dự án bất kỳ. Chính từ những khó khăn
                đấy, APN mong muốn đem đến một giải pháp quản lý dự án thân
                thiện dành cho những bạn mới bắt đầu. “Dễ dàng làm quen, nhanh
                chóng làm chủ” là kim chỉ nam để APN phát triển và cải tiến sản
                phẩm của mình. APN luôn nỗ lực để tinh gọn các tính năng, cải
                tiến chất lượng nhằm đem đến những sản phẩm tối ưu dành cho
                những bạn đã, đang và sẽ tin tưởng sử dụng APN cho công việc của
                bản thân.
              </p>
            </div>

            <IoIosArrowUp className="text-[#286A8E] text-4xl absolute top-0 left-0 rotate-[315deg]" />
            <IoIosArrowUp className="text-[#286A8E] text-4xl absolute top-0 right-0 rotate-45" />
            <IoIosArrowUp className="text-[#286A8E] text-4xl absolute bottom-0 left-0 rotate-[225deg]" />
            <IoIosArrowUp className="text-[#286A8E] text-4xl absolute bottom-0 right-0 rotate-[134deg]" />
          </section>
        </div>
      </div>
    </>
  );
}

export default Intro;
