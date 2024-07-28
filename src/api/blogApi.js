import { useMutation, useQuery, useQueryClient } from "react-query";
import { useSelector } from "react-redux";
import api from "../config/axios";
import { selectUser } from "../redux/features/userSlice";
import { API_ENDPOINTS } from "./apiEndpoint";
export const useCurrentUser = () => {
  return useSelector(selectUser);
};
const getAllBlog = async () => {
  const { data } = await api.get(`${API_ENDPOINTS.BLOG}/GetBlogsAsync`);
  return data;
};

export const useGetBlogs = () => {
  return useQuery("blogs", getAllBlog);
};

//========= get comment of blog

const getCommentOfBlog = async (blogId) => {
  const { data } = await api.get(
    `${API_ENDPOINTS.COMMENT}/GetAllCommentsByBlogIdAsync/${blogId}`
  );
  return data;
};

export const useGetCommentOfBlog = (blogId) => {
  return useQuery(["comment", blogId], () => getCommentOfBlog(blogId));
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

  return useMutation(
    (commentData) => createComment({ ...commentData, userId }),
    {
      onSuccess: (data, variables) => {
        queryClient.invalidateQueries(["comment", variables.blogId]);
      },
    }
  );
};

const deleteComment = async (commentId) => {
  const { data } = await api.delete(
    `${API_ENDPOINTS.COMMENT}/DeleteCommentAsync/${commentId}`
  );
  return data;
};

export const useDeleteComment = () => {
  const queryClient = useQueryClient();

  return useMutation((commentId) => deleteComment(commentId), {
    onSuccess: (data, commentId) => {
      queryClient.invalidateQueries(["comment", commentId]);
    },
    onError: (error) => {
      console.error("Error deleting comment:", error);
    },
  });
};
