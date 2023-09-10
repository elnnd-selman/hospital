import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const departmentApi = createApi({
  reducerPath: "departmentApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/api" }),
  endpoints: (builder) => ({
    getDepartments: builder.query({
      query: ({ page }) => `department?page=${page ?? 1}`,
    }),
    getOneDepartment: builder.query({
      query: ({ id }) => `department?id=${id}`,
    }),

    createDepartment: builder.mutation({
      query: ({ name }) => {
        return {
          url: `department`,
          method: "POST",
          body: JSON.stringify({ name }),
        };
      },
    }),
    updateDepartment: builder.mutation({
      query: ({ name, id }) => {
        return {
          url: `department?id=` + id,
          method: "PATCH",
          body: JSON.stringify({ name }),
        };
      },
    }),
    deleteDepartment: builder.mutation({
      query: ({ id }) => {
        return {
          url: `department?id=` + id,
          method: "DELETE",
        };
      },
    }),
  }),
});

export const {
  useGetDepartmentsQuery,
  useCreateDepartmentMutation,
  useGetOneDepartmentQuery,
  useUpdateDepartmentMutation,
  useDeleteDepartmentMutation
} = departmentApi;
