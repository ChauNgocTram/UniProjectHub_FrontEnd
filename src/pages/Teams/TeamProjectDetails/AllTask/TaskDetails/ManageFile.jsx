import React, { useState } from "react";
import Button from "../../../../../components/Button";
import { IoMdAdd } from "react-icons/io";
import { AiOutlinePicture } from "react-icons/ai";
import { GoFileZip } from "react-icons/go";
import { LuUpload } from "react-icons/lu";
import FileUpload from "../../../../../components/FileUpload/FileUpload";
import Tabs from "../../../../../components/Tabs/Tabs";
import { useSelector } from "react-redux";
import { selectUser } from "../../../../../redux/features/userSlice";

function ManageFile({ taskId }) {
  const [open2, setOpen2] = useState(false);
  const user = useSelector(selectUser);
  const [selectedTab, setSelectedTab] = useState(0);

  const TABS = [
    { title: "Hình ảnh", icon: <AiOutlinePicture /> },
    { title: "File", icon: <GoFileZip /> },
  ];

  return (
    <div>
      <div className="flex justify-end items-center space-x-6">
      <Button
          onClick={() => setOpen2(true)}
          label="Upload"
          icon={<LuUpload className="text-lg mr-2" />}
          className="flex flex-row-reverse items-center bg-mainColor hover:bg-mainBg font-semibold text-white rounded-md "
        />
        <Tabs tabs={TABS} setSelected={setSelectedTab}>
          {/* {selectedTab === 0 ? (
            <div className="w-full grid grid-cols-6 gap-4">
              {task?.assets?.map((el, index) => (
                <img
                  key={index}
                  src={el}
                  alt={task?.title}
                  className="w-full rounded h-28 md:h-36 2xl:h-52 cursor-pointer transition-all duration-700 hover:scale-125 hover:z-50"
                />
              ))}
            </div>
          ) : (
            <div className="w-full grid grid-cols-4 gap-4">
              {task?.assets?.map((el, index) => (
                <div
                  className="w-[450px] bg-neutral-200 border-solid border-[#5a5a5a] py-2 px-5 rounded-3xl my-2 mx-0 flex items-center gap-4"
                  key={index}
                >
                  <div className="w-11 h-11 max-w-11 max-h-11 min-w-11 min-h-11 bg-neutral-300 flex items-center justify-center rounded-xl overflow-hidden">
                    <LuFile size={25} />
                  </div>

                  <div className="w-[450px]">
                    <p className="break-all mb-2">{file.name}</p>
                    <p className="text-neutral-600 text-sm">
                      {fileSize(file.size)}
                    </p>
                  </div>

                  <div className=" ">
                    <LiaTimesSolid
                      className="text-2xl font-medium text-[#fc5355] cursor-pointer"
                      onClick={() => handleFileDelete(file.name)}
                    />
                  </div>
                </div>
              ))}
            </div>
          )} */}
        </Tabs>
        
      </div>

      <FileUpload open2={open2} setOpen2={setOpen2} taskId={taskId} userId={user.userId} />

    </div>
  );
}

export default ManageFile;
