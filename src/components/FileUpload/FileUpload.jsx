import React, { useState } from "react";
import axios from "axios";
import ModalWrapper from "../Modal/ModalWrapper";
import ProgressBar from "./ProgressBar";
import { LuFilePlus2, LuFile } from "react-icons/lu";
import { LiaTimesSolid } from "react-icons/lia";
import api from "../../config/axios";

function FileUpload({ open2, setOpen2, taskId, userId }) {
  const [files, setFiles] = useState([]);
  const [progress, setProgress] = useState(0);
  const [loader, setLoader] = useState(false);

  const fileExist = (file) => files.some((f) => f.name === file.name);

  const validExtensions = (file) => {
    const validTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    ];
    return validTypes.includes(file.type);
  };

  const validFileSize = (file, maxSizeMb) => {
    const maxfilesize_in_mb = maxSizeMb || 100;
    const filesize_in_mb = file.size / 1048576;
    return filesize_in_mb <= maxfilesize_in_mb;
  };

  const handleFileInput = (event) => {
    const selectedFiles = event.target.files;
    let validFiles = [];
    for (let i = 0; i < selectedFiles.length; i++) {
      if (!fileExist(selectedFiles[i])) {
        if (validExtensions(selectedFiles[i])) {
          if (validFileSize(selectedFiles[i], 25)) {
            setProgress(0);
            validFiles.push(selectedFiles[i]);
          } else {
            alert(
              `${selectedFiles[i].name} has invalid file size. Maximum file size is 25MB`
            );
          }
        } else {
          alert(
            `${selectedFiles[i].name} does not have a valid file extension`
          );
        }
      }
    }
    setFiles([...files, ...validFiles]);
  };

  const isImage = (file) => file && file.type.split("/")[0] === "image";

  const fileSize = (sizeInBytes) => {
    const names = ["bytes", "KB", "MB"];
    let count = 0,
      size = parseInt(sizeInBytes, 10) || 0;
    while (size >= 1024 && ++count) {
      size = size / 1024;
    }
    return size.toFixed(size < 10 && count > 0 ? 1 : 0) + " " + names[count];
  };

  const handleFileDelete = (fileName) => {
    setProgress(0);
    const newFilesAfterDelete = Array.from(files).filter(
      (file) => file.name !== fileName
    );
    setFiles([...newFilesAfterDelete]);
  };

  const handleUploads = async () => {
    if (!files.length) return;
  
    try {
      const data = new FormData();
      for (let i = 0; i < files.length; i++) {
        data.append("files", files[i]);
      }
      data.append("taskId", taskId); // Add taskId to FormData
      data.append("userId", userId); // Add userId to FormData
  
      // Log FormData contents for debugging
      for (let pair of data.entries()) {
        console.log(`${pair[0]}: ${pair[1]}`);
      }
  
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          const progressResult = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setProgress(progressResult);
        },
      };
  
      await api.post(`/api/file/upload-file`, data, config);
      setLoader(false);
      console.log("Files uploaded successfully");
    } catch (error) {
      setLoader(false);
      console.error("Error uploading files: ", error.response ? error.response.data : error.message);
    }
  };
  

  const handleFileDrop = (event) => {
    event.preventDefault();
    const droppedFiles = event.dataTransfer.files;
    let validFiles = [];
    for (let i = 0; i < droppedFiles.length; i++) {
      if (!fileExist(droppedFiles[i])) {
        if (validExtensions(droppedFiles[i])) {
          if (validFileSize(droppedFiles[i], 25)) {
            setProgress(0);
            validFiles.push(droppedFiles[i]);
          } else {
            alert(
              `${droppedFiles[i].name} has invalid file size. Maximum file size is 25MB`
            );
          }
        } else {
          alert(`${droppedFiles[i].name} does not have a valid file extension`);
        }
      }
    }
    setFiles([...files, ...validFiles]);
  };

  const getTimeString = (timeInSeconds) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor(timeInSeconds / 60 - hours * 60);
    const seconds = Math.floor(timeInSeconds - minutes * 60 - hours * 3600);
    let timeString = `${seconds} sec`;
    if (minutes) {
      timeString = `${minutes} min ${timeString}`;
    }
    if (hours) {
      timeString = `${hours} hrs ${timeString}`;
    }
    return timeString;
  };

  const totalRemTime = getTimeString(
    Object.values(files).reduce((total, current) => {
      return total + current.estimated;
    }, 0)
  );

  const handleCancel = (event) => {
    event.preventDefault();
    setFiles([]);
    setProgress(0);
    setOpen2(false);
  };

  return (
    <ModalWrapper open={open2} setOpen={setOpen2}>
      <form>
        <div className="py-1">
          <h3 className="text-2xl font-semibold uppercase mb-4">Tải file</h3>
          <ProgressBar files={files} progress={progress} loader={loader} />
        </div>

        <div className="pt-7">
          <label
            className="flex flex-col justify-between items-center gap-5 bg-slate-100 border-dashed border-[#5a5a5a] rounded-2xl py-10 px-5 text-center cursor-pointer transition duration-[400ms] hover:bg-neutral-100 hover:border-[#4e4d4d]"
            onDrop={handleFileDrop}
            onDragOver={handleFileDrop}
          >
            <div className="flex justify-center items-center w-20 h-20 rounded-full border-2 border-dashed border-neutral-400">
              <LuFilePlus2 className="text-[40px] text-neutral-700" />
            </div>

            <p className="">
              {" "}
              <span className="text-mainColor font-semibold">Tải file(s) </span>
              của bạn lên hoặc kéo thả file(s)
            </p>
            <p className="italic text-sm">Kích thước tối đa 25MB</p>
            <input
              type="file"
              onChange={handleFileInput}
              multiple
              className="w-0 h-0 invisible absolute -top-[9999px]"
            />
          </label>

          <div className="my-5 mx-0 max-h-[200px] overflow-hidden overflow-y-auto ">
            {files.reverse().map((file, index) => (
              <div
                className="w-[450px] bg-neutral-200 border-solid border-[#5a5a5a] py-2 px-5 rounded-3xl my-2 mx-0 flex items-center gap-4"
                key={index}
              >
                <div className="w-11 h-11 max-w-11 max-h-11 min-w-11 min-h-11 bg-neutral-300 flex items-center justify-center rounded-xl overflow-hidden">
                  {isImage(file) ? (
                    <img
                      src={URL.createObjectURL(file)}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <LuFile size={25} />
                  )}
                </div>

                <div className="w-[450px]">
                  <p className="break-all mb-2">{file.name}</p>
                  <p className="text-neutral-600 text-sm">
                    {fileSize(file.size)}
                  </p>
                  {file.estimated && file.estimated !== 0 && (
                    <p className="italic text-sm">
                      Thời gian ước tính: {getTimeString(file.estimated)}
                    </p>
                  )}
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
        </div>

        <div className="flex justify-between mt-5">
          <button
            type="button"
            className="bg-mainColor text-white px-4 py-2 rounded-lg hover:bg-mainColor-dark transition"
            onClick={handleUploads}
          >
            Upload
          </button>
          <button
            type="button"
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </form>
    </ModalWrapper>
  );
}

export default FileUpload;
