
import React, { useState } from "react";
import ModalWrapper from "../../Modal/ModalWrapper";
import { alert } from "../../../components/Alert/Alert";
import TaskForm from "./TaskForm";
import api from "../../../config/axios";
const LISTS = ["TODO", "IN PROGRESS", "COMPLETED", "PENDING"];
const PRIORITY = ["LOW", "MEDIUM", "HIGH"];

function UpdateTask({ open, setOpen, taskId, onTaskAdded }) {
  const [stage, setStage] = useState(LISTS[0]);
  const [priority, setPriority] = useState(PRIORITY[2]);
  const [loading, setLoading] = useState(false);
  const [taskDetail, setTaskDetail] = useState(null);

  const getTaskById = async () => {
    setLoading(true);
    try {
      const response = await api.get(
        `/api/Task/GetTaskAsync/${taskId}`
      );
      if (response.data) {
        setProjectDetail(response.data);
        setLoading(false);
        form.setFieldsValue(response.data);
      }
    } catch (error) {
      console.error("Error fetching request:", error);
      setLoading(false);
    }
  };

  const submitHandler = async(data, reset) => {
    setLoading(true);
    try {
      const payload = {
        taskName: data.taskName,
        description: data.description,
        status: LISTS.indexOf(stage) + 1,
        category: data.category, 
        tags: data.tags, 
        deadline: new Date(data.date).toISOString(),
        rate: PRIORITY.indexOf(priority) + 1,
        comment: data.comment, 
      };

      const response = await api.post(`/api/Task/UpdateTask/${projectId}`, payload);
      console.log("Create task response:", response.data); 

      if (response.status === 200) {
        onTaskAdded();
        setOpen(false);
        alert.alertSuccessWithTime(
          "Tạo Task Thành Công",
          "",
          2000,
          "30",
          () => {}
        );
        reset();
      } else {
        console.error("Failed to create task", response.data);
        alert.alertFailed(
          "Tạo Task Thất Bại",
          "Vui lòng thử lại",
          2000,
          "30",
          () => {}
        );
      }
    } catch (error) {
      console.error("Error creating task", error);
    }
    setLoading(false);
  };

  return (
    <ModalWrapper open={open} setOpen={setOpen}>
    
  </ModalWrapper>
  )
}

export default UpdateTask