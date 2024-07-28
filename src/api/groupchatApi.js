import axios from "axios";
import { API_ENDPOINTS } from "./apiEndpoint";

export const getAllGroupChats = async () => {
  try {
    const response = await axios.get(`${API_ENDPOINTS.GROUPCHAT}/get-all`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const createGroupChat = async (groupChat) => {
  try {
    const response = await axios.post(
      `${API_ENDPOINTS.GROUPCHAT}/create-group-chat`,
      groupChat
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getGroupChatById = async (id) => {
  try {
    const response = await axios.get(
      `${API_ENDPOINTS.GROUPCHAT}/get-by-id/${id}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateGroupChat = async (id, groupChat) => {
  try {
    const response = await axios.put(
      `${API_ENDPOINTS.GROUPCHAT}/update/${id}`,
      groupChat
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteGroupChat = async (id) => {
  try {
    const response = await axios.delete(
      `${API_ENDPOINTS.GROUPCHAT}/delete/${id}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
