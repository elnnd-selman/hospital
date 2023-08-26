import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth_slice";
import departmentSlice from "./slices/department_slice";
import test_slice from "./slices/test_slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    department:departmentSlice,
    test:test_slice
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
