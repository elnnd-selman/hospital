import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth_slice";
import departmentSlice from "./slices/departmentSlices";
import { departmentApi } from "./apis/departmentApis";
import { testApi } from "./apis/testApis";
import { subTestApi } from "./apis/subTestApis";

export const store = configureStore({
  reducer: {
    department: departmentSlice,
    [departmentApi.reducerPath]: departmentApi.reducer,
    [testApi.reducerPath]: testApi.reducer,
    [subTestApi.reducerPath]: subTestApi.reducer,

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      departmentApi.middleware,
      testApi.middleware,
      subTestApi.middleware,

    ]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
