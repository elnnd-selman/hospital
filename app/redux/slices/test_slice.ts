import { createSlice, current } from "@reduxjs/toolkit";
import { RegisterApi } from "../apis/auth_apis";
import { PostDepartmentApi } from "../apis/department_apis";
import { objectType } from "@material-tailwind/react/types/components/checkbox";
import { PostTestApi } from "../apis/test_apis";

interface testInterface {
  department: string;
  name: string;
  postTestIsLoading: boolean;
  addTestModalIsVisible: boolean;
  getDepartmentsLoading: boolean;
  filter: string;
  type: string;
  text: string;
  normalRange: string;
  keyAndValueKeyInputText: string;
  keyAndValueValueInputText: string;
  keyAndValue: { [key: string]: any };
  selectInputText: string;
  select: any[];
}

const initialState: testInterface = {
  department: "",
  name: "",
  postTestIsLoading: false,
  getDepartmentsLoading: false,
  addTestModalIsVisible: false,
  filter: "",
  type: "",
  text: "",
  keyAndValueValueInputText: "",
  keyAndValueKeyInputText: "",
  selectInputText: "",
  normalRange: "",
  keyAndValue: {},
  select: [],
};

const testSlice = createSlice({
  name: "test",

  initialState,
  reducers: {
    setDepartment: (state, action) => {
      console.log(action.payload);
      state.department = action.payload;
    },
    setName: (state, action) => {
      console.log(action.payload);
      state.name = action.payload;
    },
    setSelect: (state, action) => {
      state.select.push(action.payload);
    },
    removeSelect: (state, action) => {
      state.select = state.select.filter((select) => select != action.payload);
    },
    setSelectInputText: (state, action) => {
      state.selectInputText = action.payload;
    },

    setType: (state, action) => {
      state.type = action.payload;
    },

    setNormalRange: (state, action) => {
      state.normalRange = action.payload;
    },
    setKeyAndValue: (state, action) => {
      const key = state.keyAndValueKeyInputText;
      const value = state.keyAndValueValueInputText;
      state.keyAndValue[key] = value;
    },
    removeKeyAndValue: (state, action) => {
      const key = action.payload.key;
      const newObj = { ...state.keyAndValue };
      delete newObj[key];
      state.keyAndValue = newObj;
    },
    setKeyAndValueValueInputText: (state, action) => {
      state.keyAndValueValueInputText = action.payload;
    },
    setKeyAndValueKeyInputText: (state, action) => {
      state.keyAndValueKeyInputText = action.payload;
    },

    addTestVisibilityHandle: (state, action) => {
      console.log(action.payload);

      state.addTestModalIsVisible = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(PostTestApi.pending, (state, action) => {
      state.postTestIsLoading = true;
      // Add user to the state array
    });
    builder.addCase(PostTestApi.fulfilled, (state, action: any) => {
      // state.department.push(action.payload.data);

      state.postTestIsLoading = false;

      // Add user to the state array
    });

    builder.addCase(PostDepartmentApi.rejected, (state, action: any) => {
      // state.department.push(action.payload.data);
      console.log(action);

      state.postTestIsLoading = false;

      // Add user to the state array
    });
  },
});

export const testActions = testSlice.actions;
export default testSlice.reducer;
