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

export const PostDepartmentApi = createAsyncThunk(
  "department/post",
  async (_, { getState, rejectWithValue, dispatch }) => {
    const states = getState() as RootState;

    const { name } = states.department;
    const userJson = window.localStorage.getItem("user");
    if (!userJson) {
      rejectWithValue({ status: false, data: "login required" });
      
    }
    const user = JSON.parse(userJson!);
    try {
      const response = await axios.post("/api/department", {
        name,
        userId: user._id,
      });

      return response.data;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);
