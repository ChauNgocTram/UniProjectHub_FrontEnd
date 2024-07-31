import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../config/axios";
import { API_ENDPOINTS } from "./apiEndpoint";
import { alert } from "../components/Alert/Alert";

const getAllSchedule = async () => {
  try {
    const { data } = await api.get(`${API_ENDPOINTS.SCHEDULE}/all-schedules`);
    return data;
  } catch (error) {
    console.error("Error fetching schedules:", error);
    throw error;
  }
};

export const useGetAllSchedule = () => {
  return useQuery({
    queryKey: ["schedules"],
    queryFn: getAllSchedule,
  });
};

// ===== get by id
const getScheduleByUserId = async (userId) => {
  const { data } = await api.get(`${API_ENDPOINTS.SCHEDULE}/user/${userId}`);
  return data;
};

export const useGetScheduleByUserId = (userId) => {
  return useQuery({
    queryKey: ["scheduleOfUser", userId],
    queryFn: () => getScheduleByUserId(userId),
  });
};

const addSchedule = async (scheduleData) => {
  try {
    const response = await api.post(
      `${API_ENDPOINTS.SCHEDULE}/create-schedule`,
      scheduleData
    );
    return response.data;
  } catch (error) {
    console.error("Error adding schedule:", error);
    throw error;
  }
};

export const useAddSchedule = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addSchedule,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["schedules"] });
    },
    onError: (error) => {
      alert.error("Failed to add schedule: " + error.message);
    },
  });
};
