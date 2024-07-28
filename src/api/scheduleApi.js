import { useMutation, useQuery, useQueryClient } from "react-query";
import api from "../config/axios";
import { API_ENDPOINTS } from "./apiEndpoint";
import { alert } from "../components/Alert/Alert";

const getAllSchedule = async () => {
  const { data } = await api.get(`${API_ENDPOINTS.SCHEDULE}/all-schedules`);
  return data;
};

export const useGetAllSchedule = () => {
  return useQuery("schedules", getAllSchedule);
};

// ===== get by id
const getScheduleByUserId = async (userId) => {
    const { data } = await api.get(
      `${API_ENDPOINTS.SCHEDULE}/user/${userId}`
    );
    return data;
  };
  
  export const useGetScheduleByUserId = (userId) => {
    return useQuery(["scheduleOfUser", userId], () =>
    getScheduleByUserId(userId)
    );
  };