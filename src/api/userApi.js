import { useMutation, useQuery, useQueryClient } from "react-query";
import api from "../config/axios";
import { alert } from "../components/Alert/Alert";

const getAllUser = async () => {
    const { data } = await api.get(`/api/admin/users`);
    return data;
  };
  
  export const useGetAllUser = () => {
    return useQuery("users", getAllUser);
  };


  const getUserById = async (userId) => {
    const  { data } = await api.get(`/api/admin/${userId}`);
    return data;
  };
  
  export const useUserById = (userId) => {
    return useQuery(["user", userId], () => getUserById(userId));
  };