import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const patientApi = createApi({
  reducerPath: "patientApi",
  baseQuery: fetchBaseQuery({ baseUrl:  "http://localhost:3000/api" }),
  endpoints: (builder) => ({
    getPationtByDepartmentId: builder.query({
      query: ({ departmentId,page,size }) => `patient?departmentId=${departmentId}&page=${page}&size=${size}`,
    }),

    addPatient: builder.mutation({
      query: (data) => {
      
        return {
          url: `patient`,
          method: "POST",
          body: JSON.stringify(data),
        };
      },
    }),

    addResultPatient: builder.mutation({
      query: (data) => {
      
        return {
          url: `patient/add-result`,
          method: "POST",
          body: JSON.stringify(data),
        };
      },
    }),

  }),
});

export const { useAddPatientMutation ,useGetPationtByDepartmentIdQuery,useAddResultPatientMutation} = patientApi;
