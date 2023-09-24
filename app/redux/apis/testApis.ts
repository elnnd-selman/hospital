import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const testApi = createApi({
  reducerPath: "testApis",
  baseQuery: fetchBaseQuery({ baseUrl: "http://172.20.10.7:3000/api" }),
  endpoints: (builder) => ({
    getTests: builder.query({
      query: ({ page }) => `test?page=${page ?? 1}`,
    }),
    getOneTest: builder.query({
      query: ({ id }) => `test?id=${id}`,
    }),

    createTest: builder.mutation({
      query: (data) => {
        return {
          url: `test`,
          method: "POST",
          body: JSON.stringify(data),
        };
      },
    }),
    updateTest: builder.mutation({
      query: ({ name, id }) => {
        return {
          url: `test?id=` + id,
          method: "PATCH",
          body: JSON.stringify({ name }),
        };
      },
    }),
    deleteTest: builder.mutation({
      query: ({ id }) => {
        return {
          url: `test?id=` + id,
          method: "DELETE",
        };
      },
    }),
  }),
});

export const {
  useGetTestsQuery,
  useCreateTestMutation,
  useGetOneTestQuery,
  useUpdateTestMutation,
  useDeleteTestMutation,
} = testApi;
