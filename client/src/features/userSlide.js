import { createSlice, current } from "@reduxjs/toolkit";
import api from "../services/api";

export const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    addNotification: (state, { payload }) => {
      if (state.user.newMessage[payload]) {
        state.user.newMessage[payload] = state.user.newMessage[payload] + 1;
      } else {
        state.user.newMessage[payload] = 1;
      }
      console.log(current(state));
    },
    resetNotification: (state, { payload }) => {
      delete state.user.newMessage[payload];
    },
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
