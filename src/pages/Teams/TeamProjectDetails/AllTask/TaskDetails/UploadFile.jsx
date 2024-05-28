import { FileOutlined } from "@ant-design/icons";
import { Progress, Space, Typography, Upload } from "antd";
import axios from "axios";
import React, { useState } from "react";
import ModalWrapper from "../../../../../components/Modal/ModalWrapper";
import Button from "../../../../../components/Button";
import ProgressBar from "../../../../../components/FileUpload/ProgressBar";

function UploadFile({ open, setOpen }) {
  const [files, setFiles] = useState({});
  const [uploading, setUploading] = useState(false);


  const handleFileUpload = ({ file }) => {
    const getFileObject = (progress, estimated) => {
      return {
        name: file.name,
        uid: file.uid,
        progress: progress,
        estimated: estimated || 0,
      };
    };

    axios.post("", file, {
      onUploadProgress: (event) => {
        console.log(event);
        setFiles((pre) => {
          return {
            ...pre,
            [file.uid]: getFileObject(event.progress, event.estimated),
          };
        });
      },
    });
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

  return (
    <>
    <ModalWrapper open={open} setOpen={setOpen}>
      
    <Space
        direction="vertical"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 24,
        }}
      >
        <Upload.Dragger
          multiple
          customRequest={handleFileUpload}
          showUploadList={false}
          listType="picture"
          action={"http://localhost:5173/du-an-nhom/nhiem-vu/chi-tiet"}
        >
          Drag files here OR <Button>Click to upload</Button>
        </Upload.Dragger>

       
        {Object.values(files).map((file) => (
          <Space direction="vertical" key={file.uid}>
             {file.estimated ? <Typography.Text>Total remaining time: {totalRemTime}</Typography.Text> : null}
            <Space
              style={{
                backgroundColor: "rgba(0,0,0,0.05)",
                width: 500,
                padding: 8,
              }}
            >
              
              <FileOutlined />
              <Typography>{file.name}</Typography>
              <br />
              {file.estimated ? (
                <Typography.Text type="secondary">
                  is being uploaded in {getTimeString(file.estimated)} seconds
                </Typography.Text>
              ) : (
                <Typography.Text type="secondary">
                  is uploaded successfully
                </Typography.Text>
              )}
              <br />
              <Typography.Text type="secondary">
                 {file.size / 1024} KB
                </Typography.Text>
            </Space>
            {file.estimated ? <Progress percent={Math.ceil(file.progress * 100)} /> : ''}
            
          </Space>
        ))}
      </Space>
      <div className='bg-gray-50 py-6 sm:flex sm:flex-row-reverse gap-4'>
              {uploading ? (
                <span className='text-sm py-2 text-red-500'>
                  Uploading assets
                </span>
              ) : (
                <Button
                  label='Tạo'
                  type='submit'
                  className='bg-blue-600 px-8 text-sm font-semibold text-white hover:bg-blue-700  sm:w-auto'
                />
              )}

              <Button
                type='button'
                className='bg-white px-5 text-sm font-semibold text-gray-900 sm:w-auto'
                onClick={() => setOpen(false)}
                label='Huỷ'
              />
            </div>
    </ModalWrapper>
      
    </>
  );
}

export default UploadFile;
