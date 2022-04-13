import { createSlice } from "@reduxjs/toolkit";
import api from "../services/api";

export const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    addNotification: (state, { payload }) => {},
    resetNotification: (state, { payload }) => {},
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      api.endpoints.register.matchFulfilled,
      (state, { payload }) => payload
    );
    builder.addMatcher(
      api.endpoints.login.matchFulfilled,
      (state, { payload }) => payload
    );
    builder.addMatcher(api.endpoints.logout.matchFulfilled, () => null);
  },
});

export const { addNotification, resetNotification } = userSlice.actions;
export default userSlice.reducer;
