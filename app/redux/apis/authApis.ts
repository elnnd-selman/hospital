import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const authApi = createApi({
  reducerPath: "authApis",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/api" }),
  endpoints: (builder) => ({
    getUser: builder.query({
      query: ({ page }) => `subtest?page=${page ?? 1}`,
    }),

    register: builder.mutation({
      query: (data) => {
        console.log(data);
      
        return {
          url: `register`,
          method: "POST",
          body: JSON.stringify(data),
        };
      },
    }),
    login: builder.mutation({
      query: (data) => {
        
        return {
          url: `login`,
          method: "POST",
          body: JSON.stringify(data),
        };
      },
    }),
  }),
});

export const { useRegisterMutation,useLoginMutation } = authApi;
