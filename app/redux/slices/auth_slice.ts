import { createSlice } from "@reduxjs/toolkit";
import { RegisterApi } from "../apis/auth_apis";

interface authStates {
  email: string;
  name: string;
  password: string;
  registerLoading: boolean;
}

const initialState: authStates = {
  email: "",
  name: "",
  password: "",
  registerLoading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setName: (state, action) => {
      console.log(action.payload);

      state.name = action.payload;
    },
    setEmail: (state, action) => {
      console.log(action.payload);

      state.email = action.payload;
    },
    setPassword: (state, action) => {
      console.log(action.payload);

      state.password = action.payload;
    },

    register: (state, action) => {
      state.registerLoading = true;
      setTimeout(() => {
        state.registerLoading = false;
      }, 2000);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(RegisterApi.pending, (state, action) => {
      state.registerLoading = true;
      // Add user to the state array
    });
    builder.addCase(RegisterApi.fulfilled, (state, action) => {
      state.registerLoading = false;

      // Add user to the state array
    });
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
