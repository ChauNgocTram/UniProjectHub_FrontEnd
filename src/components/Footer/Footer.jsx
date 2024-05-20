import React from "react";
import { SiFacebook } from "react-icons/si";
import { SiInstagram } from "react-icons/si";

import logo from "../../assets/images/logo.png";

function Footer() {
  return (
    <footer>
      <div className="container mx-auto px-4 pb-8">
        <p className="tracking-wide text-neutral-700 font-semibold border-b border-slate-700 mb-4 uppercase mx-12">
          Kết nối với chúng tôi
        </p>
        <div className="grid md:grid-cols-12 grid-cols-1 gap-7 mx-12 md:mx-auto">
          <div className="lg:col-span-3 col-span-12 flex md:justify-center justify-start items-center">
            <a href="/">
              <img className="h-28" src={logo} alt="" />
            </a>
          </div>

          <div className="lg:col-span-2 md:col-span-4 col-span-12">
            <ul className="list-none mt-6 space-y-6">
              <li className="flex space-x-2">
                <SiFacebook size={25} />
                <a
                  href=""
                  className="flex hover:text-baseOrange transition-all duration-500 ease-in-out"
                >
                  UniProjectHub
                </a>
              </li>
              <li className="flex space-x-2">
                <SiInstagram size={25} />
                <a
                  href=""
                  className="hover:text-baseOrange transition-all duration-500 ease-in-out"
                >
                  UniProjectHub
                </a>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-4 md:col-span-4 col-span-12">
            <h5 className="tracking-wide text-neutral-700 font-semibold">
              Thông tin liên lạc
            </h5>
            
            <ul className="list-none mt-6 space-y-2">
              <li>
                <p
                  href=""
                  className="hover:text-baseOrange transition-all duration-500 ease-in-out"
                >
                  Địa chỉ: 1B, Khu phố 10, Phường Trung Dũng, Biên Hòa, Đồng Nai
                </p>
              </li>
              <li>
                <p
                  href=""
                  className="hover:text-baseOrange transition-all duration-500 ease-in-out"
                >
                  Điện thoại liên hệ: 0365322245
                </p>
              </li>
              <li>
                <p
                  href=""
                  className="hover:text-baseOrange transition-all duration-500 ease-in-out"
                >
                  Email:
                </p>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-3 md:col-span-4 col-span-12">
            <h5 className="tracking-wide text-neutral-700 font-semibold">
              Thông tin chúng tôi
            </h5>
            <ul className="list-none mt-6 space-y-2">
              <li>
                <a
                  href=""
                  className="hover:text-baseOrange transition-all duration-500 ease-in-out"
                >
                  Câu chuyện thương hiệu
                </a>
              </li>
              <li>
                <a
                  href=""
                  className="hover:text-baseOrange transition-all duration-500 ease-in-out"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href=""
                  className="hover:text-baseOrange transition-all duration-500 ease-in-out"
                >
                  Kho tài nguyên
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
