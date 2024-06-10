import React from "react";

import Footer from "../../components/Footer/Footer";
import Hero from "../../components/HomeComponent/Hero";
import Intro from "../../components/HomeComponent/Intro";
import AboutTeam from "../../components/HomeComponent/AboutTeam";

function Home() {
  return (
    <>
      {/* <div className="mt-24 wrapper-body">
        <div className="mb-12 uppercase text-2xl font-semibold border-b-2 border-neutral-700 pb-3">
          Tìm hiểu và kết nối
        </div>

        <div className="w-1/2 my-6">
          <span className="pb-2 mb-6 leading-loose pr-8 text-xl font-semibold border-b-2 border-neutral-500">
            Hướng dẫn sử dụng UniProjectHub
          </span>
          <p className="my-4 text-justify">
            Unihubproject là một nền tảng blockchain dựa trên Ethereum được
            thiết kế để cung cấp giải pháp đa dạng cho các ứng dụng tài chính
            phi tập trung (DeFi) và ứng dụng phi tập trung (DApps).
          </p>
        </div>

        <div className="flex gap-x-20">
          <div className="w-1/2 my-6">
            <span className="pb-2 mb-6 leading-loose pr-8 text-xl font-semibold border-b-2 border-neutral-500">
              Câu chuyện thương hiệu
            </span>
            <p className="my-4 text-justify">
              Với những bạn mới bắt đầu, thật không dễ dàng để vừa làm quen với
              các công đoạn của một dự án, vừa làm quen với cách sử dụng của một
              ứng dụng quản lý dự án bất kỳ. Chính từ những khó khăn đấy, APN
              mong muốn đem đến một giải pháp quản lý dự án thân thiện dành cho
              những bạn mới bắt đầu. “Dễ dàng làm quen, nhanh chóng làm chủ” là
              kim chỉ nam để APN phát triển và cải tiến sản phẩm của mình. APN
              luôn nỗ lực để tinh gọn các tính năng, cải tiến chất lượng nhằm
              đem đến những sản phẩm tối ưu dành cho những bạn đã, đang và sẽ
              tin tưởng sử dụng APN cho công việc của bản thân.{" "}
            </p>
          </div>

          <div className="w-1/2 my-6">
            <span className="pb-2 mb-6 leading-loose pr-8 text-xl font-semibold border-b-2 border-neutral-500">
              Nhà Phát triển
            </span>
            <p className="my-4 text-justify">
              Từ những sinh viên học chung một trường đại học đến những thành
              viên trong team phát triển thương hiệu APN là một chặng đường đầy
              ý nghĩa. Chúng mình làm việc cùng nhau trong một dự án môn học.
              Khi đó các thành viên đều đang gặp khó khăn trong việc chạy nhiều
              dự án cùng một lúc. Đến mức gặp nhau là chúng mình sẽ tâm sự về
              việc bản thân đang quá tải như thế nào. Tình cờ, ý tưởng về việc
              phát triển một công cụ quản lý dự án tối ưu, “dễ dàng làm quen,
              nhanh chóng làm chủ” được cả team đồng thuận. Chính APN là sợi dây
              kết nối và là niềm cảm hứng để chúng mình có thể viết tiếp câu
              chuyện phát triển của thương hiệu tại thị trường Việt Nam.
            </p>
          </div>
        </div>
      </div> */}

     <Hero/>
     <Intro/>
     <AboutTeam/>
      <Footer />
    </>
  );
}

export default Home;
