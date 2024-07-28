import { useMutation, useQuery, useQueryClient } from "react-query";
import api from "../config/axios";
import { API_ENDPOINTS } from "./apiEndpoint";
import { alert } from "../components/Alert/Alert";


const getMemberByProjectId = async (projectId) => {
    const  { data } = await api.get(`${API_ENDPOINTS.MEMBER_PROJECT}/get-members-by-project-id/${projectId}`);
    return data;
  };
  
  export const useMemberByProjectId = (projectId) => {
    return useQuery(["members", projectId], () => getMemberByProjectId(projectId));
  };


//======== add
const addMember = async (newMember) => {
    const { data } = await api.post(`${API_ENDPOINTS.MEMBER_PROJECT}/add-member`, newMember);
    return data;
  };
  
  export const useAddMember = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
      mutationFn: addMember,
      onSuccess: () => {
        queryClient.invalidateQueries('members');
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

//======= update
const updateMember = async (memberId, updatedMemberData) => {
    const { data } = await api.put(`${API_ENDPOINTS.MEMBER_PROJECT}/update-member/${memberId}`, updatedMemberData);
    return data;
  };
  
  export const useUpdateMember = () => {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: ({ memberId, updatedMemberData }) => updateMember(memberId, updatedMemberData),
      onSuccess: () => {
        queryClient.invalidateQueries('members');
        alert.alertSuccessWithTime(
          "Cập nhật thành viên thành công!",
          "",
          2000,
          "25",
          () => {}
        );
      },
      onError: (error) => {
        alert.alertFailedWithTime(
          "Cập nhật thành viên thất bại",
          error.message,
          2000,
          "25",
          () => {}
        );
      },
    });
  };