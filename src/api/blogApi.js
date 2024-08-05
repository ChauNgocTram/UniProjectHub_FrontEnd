import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../config/axios";
import { API_ENDPOINTS } from "./apiEndpoint";
import { alert } from "../components/Alert/Alert";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/features/userSlice";
export const useCurrentUser = () => {
  return useSelector(selectUser);
};
const getAllBlog = async () => {
  const { data } = await api.get(`${API_ENDPOINTS.BLOG}/GetBlogsAsync`);
  return data;
};

export const useGetBlogs = () => {
  return useQuery({
    queryKey: ["blogs"],
    queryFn: getAllBlog,
  });
};

//======== create blog
const createBlog = async (payload) => {
  const { data } = await api.post(`${API_ENDPOINTS.BLOG}/CreateBlogAsync`, payload);
  return data;
};

export const useCreateBlog = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createBlog,
    onSuccess: () => {
      alert.alertSuccessWithTime(
        "Tạo blog thành công!",
        "",
        2000,
        "25",
        () => {}
      );
      queryClient.invalidateQueries(["blogs"]);
    },
    onError: (error) => {
      alert.alertFailedWithTime(
        "Tạo blog thất bại",
        error.message,
        2000,
        "25",
        () => {}
      );
    },
  });
};

// =========== get category list
const getAllCategory = async () => {
  const { data } = await api.get(`${API_ENDPOINTS.CATEGORY}/GetCategoriesAsync`);
  return data;
};

export const useGetAllCategory = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: getAllCategory,
  });
};

// ========== get category by id
const getCategoryById = async (categoryId) => {
  const { data } = await api.get(
    `${API_ENDPOINTS.CATEGORY}/GetCategoryAsync/${categoryId}`
  );
  return data;
};

export const useGetCategoryById = (categoryId) => {
  return useQuery({
    queryKey: ["category", categoryId],
    queryFn: () => getCategoryById(categoryId),
  });
};


//========= get comment of blog

const getCommentOfBlog = async (blogId) => {
  const { data } = await api.get(
    `${API_ENDPOINTS.COMMENT}/GetAllCommentsByBlogIdAsync/${blogId}`
  );
  return data;
};

export const useGetCommentOfBlog = (blogId) => {
  return useQuery({
    queryKey: ["comment", blogId],
    queryFn: () => getCommentOfBlog(blogId),
  });
};

//============ add comment
const createComment = async ({ blogId, description, userId }) => {
  const { data } = await api.post(
    `${API_ENDPOINTS.COMMENT}/CreateCommentAsync`,
    {
      blogId,
      description,
      ownerId: userId,
      status: true,
      createdAt: new Date().toISOString(),
    }
  );
  return data;
};

export const useCreateComment = () => {
  const queryClient = useQueryClient();
  const { userId } = useCurrentUser();

  return useMutation({
    mutationFn: (commentData) => createComment({ ...commentData, userId }),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries(["comment", variables.blogId]);
    },
  });
};

const deleteComment = async (commentId) => {
  const { data } = await api.delete(
    `${API_ENDPOINTS.COMMENT}/DeleteCommentAsync/${commentId}`
  );
  return data;
};

export const useDeleteComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (commentId) => deleteComment(commentId),
    onSuccess: (data, commentId) => {
      queryClient.invalidateQueries(["comment", commentId]);
    },
    onError: (error) => {
      console.error("Error deleting comment:", error);
    },
  });
};
