import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const subTestApi = createApi({
  reducerPath: "subTestApis",
  baseQuery: fetchBaseQuery({ baseUrl: "http://172.20.10.7:3000/api" }),
  endpoints: (builder) => ({
    getSubTests: builder.query({
      query: ({ page }) => `subtest?page=${page ?? 1}`,
    }),
    getOneSubTest: builder.query({
      query: ({ id }) => `subtest?id=${id}`,
    }),

    createSubTest: builder.mutation({
      query: (data) => {
        return {
          url: `subtest`,
          method: "POST",
          body: JSON.stringify(data),
        };
      },
    }),
    updateSubTest: builder.mutation({
      query: ({ name, id }) => {
        return {
          url: `subtest?id=` + id,
          method: "PATCH",
          body: JSON.stringify({ name }),
        };
      },
    }),
    deleteSubTest: builder.mutation({
      query: ({ id }) => {
        return {
          url: `subtest?id=` + id,
          method: "DELETE",
        };
      },
    }),
  }),
});

export const {
  useGetSubTestsQuery,
  useCreateSubTestMutation,
  useGetOneSubTestQuery,
  useUpdateSubTestMutation,
  useDeleteSubTestMutation,
} = subTestApi;
