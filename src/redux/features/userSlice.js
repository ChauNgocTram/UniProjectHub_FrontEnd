import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    // nhận vào state hien tai va update bang payload
    login: (state, action) => {
      return action.payload; // Cập nhật state bằng payload
    },
    logout: () => {
      return null; // Đặt state về giá trị mặc định
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, logout } = userSlice.actions;
export const selectUser = (state) => state.user;
export default userSlice.reducer;
