import api from "../config/axios";
import { API_ENDPOINTS } from "./apiEndpoint";

// Fetch all schedules
export const fetchSchedules = async () => {
  try {
    const { data } = await api.get(`${API_ENDPOINTS.SCHEDULE}/all-schedules`);
    return data;
  } catch (error) {
    console.error(
      "Error fetching schedules:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// Fetch a specific schedule by ID
export const fetchScheduleById = async (scheduleId) => {
  try {
    const { data } = await api.get(
      `${API_ENDPOINTS.SCHEDULE}/GetScheduleById/${scheduleId}`
    );
    return data;
  } catch (error) {
    console.error(
      `Error fetching schedule by ID ${scheduleId}:`,
      error.response?.data || error.message
    );
    throw error;
  }
};

// Create a new schedule
export const createSchedule = async (scheduleData) => {
  try {
    const { data } = await api.post(
      `${API_ENDPOINTS.SCHEDULE}/CreateSchedule`,
      scheduleData
    );
    return data;
  } catch (error) {
    console.error(
      "Error creating schedule:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// Update an existing schedule
export const updateSchedule = async ({ scheduleId, scheduleData }) => {
  try {
    const { data } = await api.put(
      `${API_ENDPOINTS.SCHEDULE}/UpdateSchedule/${scheduleId}`,
      scheduleData
    );
    return data;
  } catch (error) {
    console.error(
      `Error updating schedule ID ${scheduleId}:`,
      error.response?.data || error.message
    );
    throw error;
  }
};

// Delete a schedule
export const deleteSchedule = async (scheduleId) => {
  try {
    const { data } = await api.delete(
      `${API_ENDPOINTS.SCHEDULE}/DeleteSchedule/${scheduleId}`
    );
    return data;
  } catch (error) {
    console.error(
      `Error deleting schedule ID ${scheduleId}:`,
      error.response?.data || error.message
    );
    throw error;
  }
};
