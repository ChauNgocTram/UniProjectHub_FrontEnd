import React, { Fragment, useState } from "react";
import { Menu, MenuButton, MenuItems, MenuItem, Transition } from "@headlessui/react";
import { IoLogOutOutline } from "react-icons/io5";
import { AiOutlineUser } from "react-icons/ai";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "../redux/features/userSlice";
import { useUserById } from "../api/userApi";
import { getInitials } from "../utils";

const UserAvatar = () => {
 
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const { data: userDetail, isLoading: userLoading, isError: userError } = useUserById(user.userId);
 
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem("token");
    dispatch(logout());
    navigate("/");
  };

  return (
    <>
      <div>
        <Menu as="div" className="relative inline-block text-left">
          <div className="flex items-center space-x-2">
            <MenuButton className="w-10 h-10 2xl:w-11 2xl:h-11 items-center justify-center rounded-full bg-blueLevel5">
              <span className='text-white font-semibold'>
                {getInitials(userDetail?.userName)}
              </span>
              {/* <img src={userDefault} alt="avatar" /> */}
            </MenuButton>
            <span>{userDetail?.userName}</span>
          </div>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <MenuItems className="absolute right-0 mt-2 w-56 origin-top-right divide-gray-100 rounded-md bg-white shadow-2xl ring-1 ring-black/5 focus:outline-none">
              <div className="p-4">
                <MenuItem>
                  <NavLink
                    // to={}
                    className="text-gray-700 group flex w-full items-center rounded-md px-2 py-2 text-base hover:bg-slate-100"
                  >
                    <AiOutlineUser className="mr-2" aria-hidden="true" />
                    Hồ sơ cá nhân
                  </NavLink>
                </MenuItem>

                <MenuItem>
                  <button
                    onClick={logoutHandler}
                    className="text-red-600 group flex w-full items-center rounded-md px-2 py-2 text-base hover:bg-slate-100"
                  >
                    <IoLogOutOutline className="mr-2" aria-hidden="true" />
                    Đăng xuất
                  </button>
                </MenuItem>
              </div>
            </MenuItems>
          </Transition>
        </Menu>
      </div>
    </>
  );
};

export default UserAvatar;
