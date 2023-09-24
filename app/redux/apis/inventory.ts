import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const inventoryApi = createApi({
  reducerPath: "inventory",
  baseQuery: fetchBaseQuery({ baseUrl: "http://172.20.10.7:3000/api" }),
  endpoints: (builder) => ({
    getPatients: builder.query({
      query: ({ departmentId,page }) => `inventory?page=${page}`,
    }),

  }),
});

export const {  useGetPatientsQuery} = inventoryApi;
