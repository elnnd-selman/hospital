import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const departmentApi = createApi({
  reducerPath: "departmentApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/api" }),
  endpoints: (builder) => ({
    getDepartmentWithTests: builder.query({
      query: () => `department?type=departmentWithTests`,
    }),
    getDepartments: builder.query({
      query: ({ page }) => `department?page=${page ?? 1}`,
    }),

    getOneDepartment: builder.query({
      query: ({ id }) => `department?id=${id}`,
    }),

    createDepartment: builder.mutation({
      query: (data) => {
        return {
          url: `department`,
          method: "POST",
          body: JSON.stringify(data),
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
  useGetDepartmentWithTestsQuery,
  useCreateDepartmentMutation,
  useGetOneDepartmentQuery,
  useUpdateDepartmentMutation,
  useDeleteDepartmentMutation,
} = departmentApi;
