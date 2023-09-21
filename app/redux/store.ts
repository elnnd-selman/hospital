import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth_slice";
import departmentSlice from "./slices/departmentSlices";
import { departmentApi } from "./apis/departmentApis";
import { testApi } from "./apis/testApis";
import { subTestApi } from "./apis/subTestApis";
import { authApi } from "./apis/authApis";
import { patientApi } from "./apis/patientApis";

export const store = configureStore({
  reducer: {
    department: departmentSlice,
    [departmentApi.reducerPath]: departmentApi.reducer,
    [testApi.reducerPath]: testApi.reducer,
    [subTestApi.reducerPath]: subTestApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [patientApi.reducerPath]: patientApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      departmentApi.middleware,
      testApi.middleware,
      subTestApi.middleware,
      authApi.middleware,
      patientApi.middleware,
    ]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
