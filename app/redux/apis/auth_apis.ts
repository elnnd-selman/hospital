import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";

interface userInfo {
  name: string;
  email: string;
  password: string;
}
interface State {
  name: string;
  email: string;
  password: string;
}

export const RegisterApi = createAsyncThunk(
  "auth/register",
  async (_, { getState }) => {
    const states = getState() as RootState;

    const { name, email, password } = states.auth;

    try {
      const response = await axios.post("/api/register", {
        name,
        email,
        password,
      });
      window.localStorage.setItem("user", JSON.stringify(response.data.data));

      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);
