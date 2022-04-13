import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3001/api/v1",
  }),
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (user) => ({
        url: "/user/register",
        method: "POST",
        body: user,
      }),
    }),
    login: builder.mutation({
      query: (user) => ({
        url: "/user/login",
        method: "POST",
        body: user,
      }),
    }),
    logout: builder.mutation({
      query: (payload) => ({
        url: "/user/logout",
        method: "DELETE",
        body: payload,
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useLogoutMutation } = api;
export default api;
