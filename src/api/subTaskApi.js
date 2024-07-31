import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../config/axios";
import { API_ENDPOINTS } from "./apiEndpoint";
import { alert } from "../components/Alert/Alert";

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
