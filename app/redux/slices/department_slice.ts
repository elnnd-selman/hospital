import { createSlice, current } from "@reduxjs/toolkit";
import { RegisterApi } from "../apis/auth_apis";
import { PostDepartmentApi } from "../apis/department_apis";

interface departmentInterface {
  name: string;
  postDepartmentIsLoading: boolean;
  addDepartmentModalIsVisible: boolean;
  getDepartmentsLoading: boolean;
  department: any;
  filter: string;
}

const initialState: departmentInterface = {
  name: "",
  postDepartmentIsLoading: false,
  getDepartmentsLoading: false,
  addDepartmentModalIsVisible: false,
  filter: "",
  department: {},
};

const departmentSlice = createSlice({
  name: "department",

  initialState,
  reducers: {
    setName: (state, action) => {
      console.log(action.payload);

      state.name = action.payload;
    },
    addDepartmentVisibilityHandle: (state, action) => {
      state.addDepartmentModalIsVisible = action.payload;
    },
    getDepartments: (state, action) => {
      state.department = action.payload;
      console.log(state.department);
    },
    filterHandle: (state, action) => {
      state.filter = action.payload;
    },
    removeDepartmentFromDepartments: (state, action) => {
      const deps = current(state.department);
      console.log("DEPS", deps);
      state.department.docs = deps.docs.filter(
        (dep: any) => dep._id != action.payload
      );
    },

    addDepartmentFromDepartments: (state, action) => {
      const deps = current(state.department);
      console.log("DEPS", deps);
      state.department.docs = deps.docs.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(PostDepartmentApi.pending, (state, action) => {
      state.postDepartmentIsLoading = true;
      // Add user to the state array
    });
    builder.addCase(PostDepartmentApi.fulfilled, (state, action: any) => {
      const deps = current(state.department);
      const oldState = { ...deps };
      oldState.docs = [...oldState.docs, action.payload.data];
      state.department = oldState;
      state.postDepartmentIsLoading = false;
    });

    builder.addCase(PostDepartmentApi.rejected, (state, action: any) => {
      // state.department.push(action.payload.data);
      console.log(action);

      state.postDepartmentIsLoading = false;

      // Add user to the state array
    });
  },
});

export const departmentActions = departmentSlice.actions;
export default departmentSlice.reducer;
