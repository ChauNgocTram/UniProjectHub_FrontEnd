import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../config/axios";
import { API_ENDPOINTS } from "./apiEndpoint";
import { alert } from "../components/Alert/Alert";

const getMemberByProjectId = async (projectId) => {
  const { data } = await api.get(
    `${API_ENDPOINTS.MEMBER_PROJECT}/get-members-by-project-id/${projectId}`
  );
  return data;
};

export const useMemberByProjectId = (projectId) => {
  return useQuery({
    queryKey: ["members", projectId],
    queryFn: () => getMemberByProjectId(projectId),
  });
};

//======== add
const addMember = async (newMember) => {
  const { data } = await api.post(
    `${API_ENDPOINTS.MEMBER_PROJECT}/add-member`,
    newMember
  );
  return data;
};

export const useAddMember = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addMember,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["members"] });
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
  const { data } = await api.put(
    `${API_ENDPOINTS.MEMBER_PROJECT}/update-member/${memberId}`,
    updatedMemberData
  );
  return data;
};

export const useUpdateMember = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ memberId, updatedMemberData }) =>
      updateMember(memberId, updatedMemberData),
    onSuccess: () => {
      queryClient.invalidateQueries("members");
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


//----------delete
const deleteMember = async (id) => {
  const { data } = await api.delete(
    `${API_ENDPOINTS.MEMBER_PROJECT}/delete-member/${id}`
  );
  console.log('API Response:', response.data);
  return data;
};

export const useDeleteMember = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteMember,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["members"] });
      alert.alertSuccessWithTime(
        "Thành viên đã được xóa!",
        "",
        2000,
        "25",
        () => {}
      );
    },
    onError: (error) => {
      alert.alertFailedWithTime(
        "Xóa thành viên thất bại",
        error.message,
        2000,
        "25",
        () => {}
      );
    },
  });
};