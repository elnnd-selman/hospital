import { createSlice } from "@reduxjs/toolkit";

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

      state.name = action.payload;
    },
    setEmail: (state, action) => {

      state.email = action.payload;
    },
    setPassword: (state, action) => {

      state.password = action.payload;
    },

    register: (state, action) => {
      state.registerLoading = true;
      setTimeout(() => {
        state.registerLoading = false;
      }, 2000);
    },
  },
  
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
