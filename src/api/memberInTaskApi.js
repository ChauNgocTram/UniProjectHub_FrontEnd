import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../config/axios";
import { API_ENDPOINTS } from "./apiEndpoint";
import { alert } from "../components/Alert/Alert";

const getMemberByTaskId = async (taskId) => {
    const { data } = await api.get(
      `${API_ENDPOINTS.MEMBER_TASK}/GetByTaskIdAsync/${taskId}`
    );
    return data;
  };
  
  export const useMemberByTaskId = (taskId) => {
    return useQuery({
      queryKey: ["membersInTask", taskId],
      queryFn: () => getMemberByTaskId(taskId),
    });
  };
  
  //======== add
const addMemberInTask = async (newMember) => {
    const { data } = await api.post(
      `${API_ENDPOINTS.MEMBER_TASK}/Create`,
      newMember
    );
    return data;
  };
  
  export const useAddMemberInTask = () => {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: addMemberInTask,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["membersInTask"] });
        alert.alertSuccessWithTime(
          "Đã thêm thành viên!",
          "",
          2000,
          "25",
          () => {}
        );
      },
      onError: (error) => {
        alert.alertFailedWithTime(
          "Thêm thành viên thất bại",
          error.message,
          2000,
          "25",
          () => {}
        );
      },
    });
  };