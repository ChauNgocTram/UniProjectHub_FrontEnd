import React, { useState } from "react";
import Button from "../../../../../components/Button";
import { IoMdAdd } from "react-icons/io";
import { AiOutlinePicture } from "react-icons/ai";
import { GoFileZip } from "react-icons/go";
import FileUpload from "../../../../../components/FileUpload/FileUpload";
import Tabs from "../../../../../components/Tabs/Tabs";

function ManageFile() {
  const [open2, setOpen2] = useState(false);
  
  const [selectedTab, setSelectedTab] = useState(0);

  const TABS = [
    { title: "Hình ảnh", icon: <AiOutlinePicture /> },
    { title: "File", icon: <GoFileZip /> },
  ];

  return (
    <div>
      <div className="flex justify-end items-center space-x-6">
      <Tabs tabs={TABS} setSelected={setSelectedTab}></Tabs>
      <Button
        onClick={() => setOpen2(true)}
        label="Thêm file"
        icon={<IoMdAdd className="text-lg" />}
        className="flex flex-row-reverse items-center bg-mainColor font-semibold text-white rounded-md "
      />
      </div>
      
   
      <FileUpload open2={open2} setOpen2={setOpen2} />
    </div>
  );
}

export default ManageFile;
