import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../config/axios";
import { API_ENDPOINTS } from "./apiEndpoint";
import { alert } from "../components/Alert/Alert";

const getTasksByProjectId = async (projectId) => {
  const { data } = await api.get(
    `${API_ENDPOINTS.TASK}/GetTasksForProjectAsync/${projectId}`
  );
  return data;
};

export const useTasksByProjectId = (projectId) => {
  return useQuery({
    queryKey: ["tasks", projectId],
    queryFn: () => getTasksByProjectId(projectId),
  });
};

// ======get by id
const getTaskById = async (taskId) => {
  const { data } = await api.get(
    `${API_ENDPOINTS.TASK}/GetTaskAsync/${taskId}`
  );
  return data;
};

export const useTaskById = (taskId) => {
  return useQuery({
    queryKey: ["task", taskId],
    queryFn: () => getTaskById(taskId),
  });
};

// ============== create
const createTask = async (projectId, payload) => {
  const { data } = await api.post(
    `${API_ENDPOINTS.TASK}/CreateTask/${projectId}`,
    payload
  );
  return data;
};

export const useCreateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ projectId, payload }) => createTask(projectId, payload),
    onSuccess: () => {
      alert.alertSuccessWithTime(
        "Tạo Task Thành Công",
        "",
        2000,
        "30",
        () => {}
      );
      queryClient.invalidateQueries(["tasks"]);
    },
    onError: (error) => {
      alert.alertFailed(
        "Tạo Task Thất Bại",
        "Vui lòng thử lại",
        2000,
        "30",
        () => {}
      );
      console.error("Error creating task:", error);
    },
  });
};

// ================ update
const updateTask = async (taskId, payload) => {
  const { data } = await api.put(
    `${API_ENDPOINTS.TASK}/UpdateTask/${taskId}`,
    payload
  );
  return data;
};

export const useUpdateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ taskId, payload }) => updateTask(taskId, payload),
    onSuccess: () => {
      alert.alertSuccessWithTime(
        "Cập nhật task thành công!",
        "",
        2000,
        "25",
        () => {}
      );
      queryClient.invalidateQueries(["tasks"]);
    },
    onError: (error) => {
      alert.alertFailedWithTime(
        "Failed to update",
        error.message,
        2000,
        "25",
        () => {}
      );
    },
  });
};

// ================ delete
const deleteTask = async (taskId) => {
  const { data } = await api.delete(
    `${API_ENDPOINTS.TASK}/DeleteTask/${taskId}`
  );
  return data;
};

export const useDeleteTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (taskId) => deleteTask(taskId),
    onSuccess: () => {
      alert.alertSuccessWithTime(
        "Xoá task thành công!",
        "",
        2000,
        "25",
        () => {}
      );
      queryClient.invalidateQueries(["tasks"]);
    },
    onError: (error) => {
      alert.alertFailedWithTime(
        "Failed to delete",
        error.message,
        2000,
        "25",
        () => {}
      );
    },
  });
};
