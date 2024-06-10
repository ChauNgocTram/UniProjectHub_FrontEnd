import React from "react";
import intro from "../../assets/images/intro.jpg";

import { IoMdArrowDropright, IoIosArrowUp } from "react-icons/io";

function AboutTeam() {
  return (
    <>
      <div className="flex justify-between items-center xl:w-[1200px] mx-auto px-4 gap-2 mb-6">
        <div>
          <img
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
            className="lg:w-[420px] w-80 rounded-tl-[100px] rounded-br-[100px] "
          />
        </div>
        <div className="w-1/2 my-6">
          <span className="pb-2 mb-6 leading-loose pr-8 text-2xl font-semibold border-b-2 border-neutral-500">
            Nhà Phát triển
          </span>
          <p className="my-4 text-justify">
            Từ những sinh viên học chung một trường đại học đến những thành viên
            trong team phát triển thương hiệu APN là một chặng đường đầy ý
            nghĩa. Chúng mình làm việc cùng nhau trong một dự án môn học. Khi đó
            các thành viên đều đang gặp khó khăn trong việc chạy nhiều dự án
            cùng một lúc. Đến mức gặp nhau là chúng mình sẽ tâm sự về việc bản
            thân đang quá tải như thế nào. Tình cờ, ý tưởng về việc phát triển
            một công cụ quản lý dự án tối ưu, “dễ dàng làm quen, nhanh chóng làm
            chủ” được cả team đồng thuận. Chính APN là sợi dây kết nối và là
            niềm cảm hứng để chúng mình có thể viết tiếp câu chuyện phát triển
            của thương hiệu tại thị trường Việt Nam.
          </p>
        </div>
      </div>
    </>
  );
}

export default AboutTeam;
