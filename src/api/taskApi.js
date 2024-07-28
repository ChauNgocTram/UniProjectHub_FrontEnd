import { useMutation, useQuery, useQueryClient } from "react-query";
import api from "../config/axios";
import { API_ENDPOINTS } from "./apiEndpoint";
import { alert } from "../components/Alert/Alert";


const getTasksByProjectId = async (projectId) => {
    const  { data } = await api.get(`${API_ENDPOINTS.TASK}/GetTasksForProjectAsync/${projectId}`);
    return data;
  };
  
  export const useTasksByProjectId = (projectId) => {
    return useQuery(["tasks", projectId], () => getTasksByProjectId(projectId));
  };

// ============== create
const createTask = async (projectId, payload) => {
  const { data } = await api.post(`${API_ENDPOINTS.TASK}/CreateTask/${projectId}`, payload);
  return data;
};

export const useCreateTask = () => {
  const queryClient = useQueryClient();

  return useMutation(
    ({ projectId, payload }) => createTask(projectId, payload),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('tasks'); 
      },
      onError: (error) => {
        console.error("Error creating task:", error);
      },
    }
  );
};

// ================ delete 
const deleteTask = async (taskId) => {
    const { data } = await api.delete(`${API_ENDPOINTS.TASK}/DeleteTask/${taskId}`);
    return data;
  };
  
  export const useDeleteTask = () => {
    const queryClient = useQueryClient();
    
    return useMutation((taskId) => deleteTask(taskId), {
      onSuccess: () => {        
        alert.alertSuccessWithTime(
          "Xoá task thành công!",
          "",
          2000,
          "25",
          () => {}
        );
        queryClient.invalidateQueries("tasks");
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