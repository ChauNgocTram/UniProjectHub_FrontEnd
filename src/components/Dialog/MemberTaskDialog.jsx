import React, { Fragment, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import {
  Menu,
  Transition,
  MenuButton,
  MenuItems,
  MenuItem,
} from "@headlessui/react";
import DeleteMemberTask from "../Tasks/ManageMemberInTask/DeleteMemberTask";

const MemberTaskDialog = ({ memberTask, onDelete }) => {
  return (
    <div>
    <Menu as="div" className="relative inline-block text-left">
      <MenuButton className="inline-flex w-full justify-center rounded-md pl-4 py-2 text-sm font-medium text-gray-600 ">
        <BsThreeDotsVertical />
      </MenuButton>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <MenuItems className="absolute p-2 right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 z-10 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
         
          <div className="">
            <MenuItem>
              <DeleteMemberTask memberTask={memberTask} onDelete={onDelete} />
            </MenuItem>
          </div>
        </MenuItems>
      </Transition>
    </Menu>
  </div>
  )
}

export default MemberTaskDialog