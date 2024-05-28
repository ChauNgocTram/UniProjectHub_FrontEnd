import React, { useState } from "react";

import ProgressBar from "./ProgressBar";
import { LuFilePlus2, LuFile } from "react-icons/lu";
import { LiaTimesSolid } from "react-icons/lia";
import axios from "axios";
import clsx from "clsx";
import ModalWrapper from "../Modal/ModalWrapper";

function FileUpload({ open2, setOpen2 }) {
  const [files, setFiles] = useState([]);
  const [progress, setProgress] = useState(0);
  const [loader, setLoader] = useState(false);

  // const fileExist = (file) => {
  //   if (file) {
  //     const result = Array.from(files).filter((f) => f.name === file.name);
  //     if (result.length) {
  //       return true;
  //     }
  //     return false;
  //   }
  // };
  const fileExist = (file) => {
    return files.some((f) => f.name === file.name);
  };

  // const validExtensions = (file) => {
  //   if (
  //     file.type === "image/jpeg" ||
  //     file.type === "image/jpg" ||
  //     file.type === "image/png" ||
  //     file.type === "application/pdf" ||
  //     file.type ===
  //       "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
  //     file.type === "application/msword" ||
  //     file.type ===
  //       "application/vnd.openxmlformats-officedocument.presentationml.presentation"
  //   ) {
  //     return true;
  //   }
  //   return false;
  // };
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

  // const validFileSize = (file, maxSizeMb) => {
  //   let maxfilesize_in_mb = maxSizeMb || 100, //100mb
  //     filesize = file.size,
  //     filesize_in_mb = Math.round(filesize / 1048576);
  //   if (filesize_in_mb > maxfilesize_in_mb) {
  //     return false;
  //   }
  //   return true;
  // };
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
  // const handleFileInput = (event) => {
  //   const selectedFiles = Array.from(event.target.files);
  //   let validFiles = [];

  //   selectedFiles.forEach((file) => {
  //     if (!fileExist(file) && validExtensions(file) && validFileSize(file, 25)) {
  //       validFiles.push({ ...file });
  //     } else {
  //       alert(`${file.name} không hợp lệ hoặc kích thước tệp quá lớn`);
  //     }
  //   });

  //   setFiles((prevFiles) => [...prevFiles, ...validFiles]);
  // };

  const isImage = (file) => {
    return file && file["type"].split("/")[0] === "image";
  };
  // const isImage = (file) => {
  //   return file && file.type && file.type.startsWith("image");
  // };

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
    if (!files.length) {
      return;
    }

    try {
      const data = new FormData();
      for (let i = 0; i < files.length; i++) {
        data.append("files", files[i]);
      }

      const config = {
        headers: {
          "Content-Type": "application/form-data",
        },
        onUploadProgress: (progressEvent) => {
          const progressResult = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setProgress(progressResult);
        },
      };

      axios
        .post(``, data, config)
        .then((response) => {
          setLoader(false);
          console.log("Response here: ", response);
        })
        .catch((error) => {
          setLoader(false);
          throw new Error(error.message);
        });
    } catch (err) {
      console.log(err);
    }
  };
  // const handleUploads = async () => {
  //   if (!files.length) return;

  //   setLoader(true);
  //   const data = new FormData();
  //   files.forEach((file) => data.append("files", file));

  //   try {
  //     const config = {
  //       headers: { "Content-Type": "multipart/form-data" },
  //       onUploadProgress: (progressEvent) => {
  //         const totalLoaded = progressEvent.loaded;
  //         const totalSize = progressEvent.total;
  //         const progressPercentage = Math.round((totalLoaded * 100) / totalSize);
  //         const remainingTime = (totalSize - totalLoaded) / 1000; // Tính thời gian ước tính
  //       //  setProgress(progressPercentage);
  //         setFiles((prevFiles) =>
  //           prevFiles.map((file) => ({
  //             ...file,
  //             estimated: remainingTime,
  //           }))
  //         );
  //       },
  //     };

  //     await axios.post(``, data, config);
  //     setLoader(false);
  //     setFiles((prevFiles) =>
  //       prevFiles.map((file) => ({ ...file, estimated: null }))
  //     );
  //   } catch (error) {
  //     setLoader(false);
  //     console.error(error);
  //   }
  // };

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
  };
  // const handleFileDrop = (event) => {
  //   event.preventDefault();
  //   const droppedFiles = Array.from(event.dataTransfer.files);
  //   let validFiles = [];

  //   droppedFiles.forEach((file) => {
  //     if (!fileExist(file) && validExtensions(file) && validFileSize(file, 25)) {
  //       validFiles.push({ ...file, estimated: 0 });
  //     } else {
  //       alert(`${file.name} không hợp lệ hoặc kích thước tệp quá lớn`);
  //     }
  //   });

  //   setFiles((prevFiles) => [...prevFiles, ...validFiles]);
  // };

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
            //onDragOver={(e) => e.preventDefault()}
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
            {/* {Array.from(files)
            .reverse()
            .map((file, index) => { */}
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
                    //onClick={() => handleFileDelete(file.name)}
                    onClick={() => handleFileDelete(file.name)}
                  />
                </div>
              </div>
              // })}
            ))}
          </div>
        </div>

        <div className="bottom flex gap-5 justify-between mt-10">
          <button className="block w-full" onClick={handleCancel}>
            Huỷ
          </button>
          <button
            className="block w-full bg-mainColor p-2 rounded-xl font-bold"
            //onClick={() => handleUploads()}
            onClick={handleUploads}
          >
            {loader ? "Vui lòng đợi..." : "Lưu"}
          </button>
        </div>
      </form>
    </ModalWrapper>
  );
}

export default FileUpload;
