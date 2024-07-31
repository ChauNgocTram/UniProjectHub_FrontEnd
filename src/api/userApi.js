import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../config/axios";
import { alert } from "../components/Alert/Alert";

const getAllUser = async () => {
  const { data } = await api.get(`/api/admin/users`);
  return data;
};

export const useGetAllUser = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: getAllUser,
  });
};

const getUserById = async (userId) => {
  const { data } = await api.get(`/api/admin/${userId}`);
  return data;
};

export const useUserById = (userId) => {
  return useQuery({
    queryKey: ["user", userId],
    queryFn: () => getUserById(userId),
  });
};
