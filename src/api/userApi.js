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
