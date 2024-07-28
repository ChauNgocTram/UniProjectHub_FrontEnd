import { useMutation, useQuery, useQueryClient } from "react-query";
import api from "../config/axios";
import { API_ENDPOINTS } from "./apiEndpoint";
import { alert } from "../components/Alert/Alert";

const getGroupProjectsByUser = async (userId) => {
  const { data } = await api.get(
    `${API_ENDPOINTS.PROJECT}/GetGroupProjectsByUserAsync/${userId}`
  );
  return data;
};

export const useGetGroupProjectsByUser = (userId) => {
  return useQuery(["groupProject", userId], () =>
    getGroupProjectsByUser(userId)
  );
};

// ======= project ca nhan
const getPersonalProjectsByUser = async (userId) => {
  const { data } = await api.get(
    `${API_ENDPOINTS.PROJECT}/GetProjectsByUserOwner/${userId}`
  );
  return data;
};

export const useGetPersonalProject = (userId) => {
  return useQuery(["personalProjects", userId], () =>
    getPersonalProjectsByUser(userId)
  );
};

// ===== get by id
const getProjectById = async (projectId) => {
  const { data } = await api.get(
    `${API_ENDPOINTS.PROJECT}/GetProjectById/${projectId}`
  );
  return data;
};

export const useGetProjectById = (projectId) => {
  return useQuery(["projectDetail", projectId], () =>
    getProjectById(projectId)
  );
};

// ========== create
const createGroupProject = async (ownerId, payload) => {
  const { data } = await api.post(
    `${API_ENDPOINTS.PROJECT}/CreateProject/${ownerId}`,
    payload
  );
  return data;
};

export const useCreateGroupProject = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (variables) => createGroupProject(variables.ownerId, variables.payload),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("groupProject");
        queryClient.invalidateQueries("personalProjects");
      },
    }
  );
};

// ======== update
const updateProject = async ({ projectId, payload }) => {
  const { data } = await api.put(
    `${API_ENDPOINTS.PROJECT}/UpdateProject/${projectId}`,
    payload
  );
  return data;
};

export const useUpdateProject = () => {
  const queryClient = useQueryClient();

  return useMutation(
    ({ projectId, payload }) => updateProject({ projectId, payload }),
    {
      onSuccess: ({ projectId }) => {
        alert.alertSuccessWithTime(
          "Cập nhật dự án thành công!",
          "",
          2000,
          "25",
          () => {}
        );
        queryClient.invalidateQueries(["projectDetail", projectId]);
      },
      onError: (error) => {
        alert.alertFailedWithTime(
          "Xoá dự án thất bại",
          error.message,
          2000,
          "25",
          () => {}
        );
      },
    }
  );
};

// ========= delete

const deleteGroupProject = async (projectId) => {
  const { data } = await api.delete(
    `${API_ENDPOINTS.PROJECT}/DeleteProject/${projectId}`
  );
  return data;
};

export const useDeleteGroupProject = () => {
  const queryClient = useQueryClient();

  return useMutation((projectId) => deleteGroupProject(projectId), {
    onSuccess: () => {
      alert.alertSuccessWithTime(
        "Xoá dự án thành công!",
        "",
        2000,
        "25",
        () => {}
      );
      queryClient.invalidateQueries("groupProject");
      queryClient.invalidateQueries("personalProjects");
    },
    onError: (error) => {
      alert.alertFailedWithTime(
        "Xoá project thất bại",
        error.message,
        2000,
        "25",
        () => {}
      );
    },
  });
};
