import React, { Fragment, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { MdAdd, MdOutlineEdit } from "react-icons/md";
import {
  Menu,
  Transition,
  MenuButton,
  MenuItems,
  MenuItem,
} from "@headlessui/react";
import DeleteSubTask from "../Tasks/ManageSubTask/DeleteSubTask";
import UpdateSubTask from "../Tasks/ManageSubTask/UpdateSubTask";

const SubTaskDialog = ({ subTask, onDelete }) => {
  const [openEdit, setOpenEdit] = useState(false);

  const items = [
    {
      label: "Chỉnh sửa",
      icon: <MdOutlineEdit className="mr-2 h-5 w-5" aria-hidden="true" />,
      onClick: () => setOpenEdit(true),
    },
  ];

  return (
    <>
      <div>
        <Menu as="div" className="relative inline-block text-left">
          <MenuButton className="inline-flex w-full justify-center rounded-md pl-4 py-2 text-sm font-medium text-gray-600 ">
            <BsThreeDots />
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
            <MenuItems className="absolute p-4 right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 z-10 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
              <div className="px-1 py-1 space-y-2">
                {items.map((el) => (
                  <MenuItem key={el.label}>
                    {({ active }) => (
                      <button
                        onClick={el?.onClick}
                        className={`${
                          active ? "bg-blueLevel1 " : "text-gray-900"
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      >
                        {el.icon}
                        {el.label}
                      </button>
                    )}
                  </MenuItem>
                ))}
              </div>

              <div className="px-1 py-1">
                <MenuItem>
                  <DeleteSubTask subTask={subTask} onDelete={onDelete} />
                </MenuItem>
              </div>
            </MenuItems>
          </Transition>
        </Menu>
      </div>

      <UpdateSubTask
        open={openEdit}
        setOpen={setOpenEdit}
        subTaskId={subTask.id}
      />
    </>
  );
};

export default SubTaskDialog;
