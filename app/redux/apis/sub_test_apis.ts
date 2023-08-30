import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";

export const PostSubTestApi = createAsyncThunk(
  "test/post",
  async (_, { getState, rejectWithValue, dispatch }) => {
    const states = getState() as RootState;

    const { department, name, test, type, normalRange, keyAndValue, select } =
      states.subTest;
    const userJson = window.localStorage.getItem("user");
    if (!userJson) {
      rejectWithValue({ status: false, data: "login required" });
    }
    const user = JSON.parse(userJson!);
    let data = null;
    if (type == "normalRange") {
      data = normalRange;
    } else if (type == "keyAndValue") {
      data = keyAndValue;
    } else if (type == "select") {
      data = select;
    }
    try {
      const response = await axios.post("/api/sub_test", {
        department,
        test,

        name,
        userId: user._id,
        type,
        data,
      });

      return response.data;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);
