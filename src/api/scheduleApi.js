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

//======== adđ schedule
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
      queryClient.invalidateQueries({ queryKey: ["scheduleOfUser"] });
      alert.alertSuccessWithTime(
        "Tạo Schedule thành công!",
        "",
        2000,
        "25",
        () => {}
      );
    },
    onError: (error) => {
      alert.alertFailedWithTime(
        "Tạo Schedule thất bại",
        error.message,
        2000,
        "25",
        () => {}
      );
    },
  });
};

// ====== delete schedule
const deleteSchedule = async (scheduleId) => {
  const { data } = await api.delete(
    `${API_ENDPOINTS.SCHEDULE}/delete-schedule/${scheduleId}`
  );
  return data;
};

export const useDeleteSchedule = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (scheduleId) => deleteSchedule(scheduleId),
    onSuccess: () => {
      alert.alertSuccessWithTime(
        "Xoá schedule thành công!",
        "",
        2000,
        "25",
        () => {}
      );
      queryClient.invalidateQueries(["schedules"]);
      queryClient.invalidateQueries({ queryKey: ["scheduleOfUser"] });
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

