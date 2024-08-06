import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../config/axios";
import { API_ENDPOINTS } from "./apiEndpoint";
import { alert } from "../components/Alert/Alert";

//========== get sub task by task id
const getSubTasksByTaskId = async (taskId) => {
  const { data } = await api.get(
    `${API_ENDPOINTS.SUB_TASK}/GetSubTasksByTaskId/${taskId}`
  );
  return data;
};

export const useSubTasksByTaskId = (taskId) => {
  return useQuery({
    queryKey: ["subtasks", taskId],
    queryFn: () => getSubTasksByTaskId(taskId),
  });
};

//=========get sub task by id
const getSubTasksById = async (subTaskId) => {
  const { data } = await api.get(
    `${API_ENDPOINTS.SUB_TASK}/GetSubTaskById/${subTaskId}`
  );
  return data;
};

export const useSubTasksById = (subTaskId) => {
  return useQuery({
    queryKey: ["subtask", subTaskId],
    queryFn: () => getSubTasksById(subTaskId),
  });
};

//========== create sub task
const createSubTask = async (payload) => {
  const { data } = await api.post(
    `${API_ENDPOINTS.SUB_TASK}/CreateSubTaskAsync`,
    payload
  );
  return data;
};

export const useCreateSubTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload) => createSubTask(payload),
    onSuccess: () => {
      alert.alertSuccessWithTime(
        "Thêm việc thành công",
        "",
        2000,
        "30",
        () => {}
      );
      queryClient.invalidateQueries(["subtasks"]);
    },
    onError: (error) => {
      alert.alertFailed(
        "Thêm việc Thất Bại",
        error.message,
        2000,
        "30",
        () => {}
      );
      console.error("Error creating subtask:", error);
    },
  });
};

// ================ update subtask
const updateSubTask = async (subTaskId, payload) => {
  const { data } = await api.put(
    `${API_ENDPOINTS.SUB_TASK}/UpdateSubTaskAsync/${subTaskId}`,
    payload
  );
  return data;
};

export const useUpdateSubTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ subTaskId, payload }) => updateSubTask(subTaskId, payload),
    onSuccess: () => {
      alert.alertSuccessWithTime(
        "Cập nhật công việc thành công!",
        "",
        2000,
        "25",
        () => {}
      );
      queryClient.invalidateQueries(["subtasks"]);
    },
    onError: (error) => {
      alert.alertFailedWithTime(
        "Cập nhật công việc thất bại",
        error.message,
        2000,
        "25",
        () => {}
      );
    },
  });
};

// ================ delete
const deleteSubTask = async (subTaskId) => {
  const { data } = await api.delete(
    `${API_ENDPOINTS.SUB_TASK}/DeleteSubTaskAsync/${subTaskId}`
  );
  return data;
};

export const useDeleteSubTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (subTaskId) => deleteSubTask(subTaskId),
    onSuccess: () => {
      alert.alertSuccessWithTime(
        "Xoá việc thành công!",
        "",
        2000,
        "25",
        () => {}
      );
      queryClient.invalidateQueries(["subtasks"]);
    },
    onError: (error) => {
      alert.alertFailedWithTime(
        "Xoá thất bại",
        error.message,
        2000,
        "25",
        () => {}
      );
    },
  });
};