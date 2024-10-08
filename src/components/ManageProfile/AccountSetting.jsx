import React , { useState } from "react";
import { BsFillImageFill } from "react-icons/bs";

function AccountSetting({ userInfo }) {
  return (
    <>
      <form>
        <div className="space-y-12 pt-6 px-24">
          <div className="border-b border-slate-400 pb-12">
            <p className="mt-1 text-sm italic leading-6 text-gray-600">
              Thông tin này sẽ được hiển thị công khai vì vậy hãy cẩn thận với
              những gì bạn chia sẻ.
            </p>

            <div className="mt-3 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="first-name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Họ và Tên đệm
                </label>
                <div className="mt-2">
                  <input
                    value={userInfo?.lastName || ""}
                    type="text"
                    name="first-name"
                    id="first-name"
                    className="block w-full rounded-md border-0 px-3 py-1.5 outline-none shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="last-name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Tên
                </label>
                <div className="mt-2">
                  <input
                    value={userInfo?.firstName || ""}
                    type="text"
                    name="last-name"
                    id="last-name"
                    className="block w-full rounded-md border-0 px-3 py-1.5 outline-none shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Tên người dùng
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      value={userInfo?.userName || ""}
                      type="text"
                      name="username"
                      id="username"
                      className="block w-full rounded-md border-0 px-3 py-1.5 outline-none shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={userInfo?.email || ""}
                    className="block w-full rounded-md border-0 px-3 py-1.5 outline-none shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="street-address"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Địa chỉ
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="street-address"
                    id="street-address"
                    value={userInfo?.university || ""}
                    className="block w-full rounded-md border-0 px-3 py-1.5 outline-none shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-2 sm:col-start-1">
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Điện thoại liên hệ
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="phone"
                    id="phone"
                    value={userInfo?.phoneNumber || ""}
                    className="block w-full rounded-md border-0 px-3 py-1.5 outline-none shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
            {/* <div className="border-b border-slate-300 pb-12"></div> */}
            {/* <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="col-span-full">
                <label
                  htmlFor="photo"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Ảnh đại diện
                </label>
                <div className="mt-2 flex items-center gap-x-3">
                  <img
                    src={ ""}
                    alt="Profile"
                    className="h-12 w-12 rounded-full"
                  />
                  <button
                    type="button"
                    className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  >
                    Thay đổi
                  </button>
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="cover-photo"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Ảnh bìa
                </label>
                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                  <div className="text-center">
                    <BsFillImageFill className="mx-auto h-12 w-12 text-gray-300" />
                    <div className="mt-4 flex text-sm leading-6 text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer rounded-md bg-white font-semibold text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                      >
                        <span>Upload a file</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          className="sr-only"
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs leading-5 text-gray-600">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </div>

        <div className="mt-6 px-24 pb-6 flex items-center justify-end gap-x-6">
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
      </form>
    </>
  );
}

export default AccountSetting;
