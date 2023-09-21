import { createSlice, current } from "@reduxjs/toolkit";

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
    addDepartmentsToList: (state, action) => {
      const data = action.payload;
      if (data.status == 200) {
        state.department = data.docs;
      }
    },

    setName: (state, action) => {

      state.name = action.payload;
    },
    addDepartmentVisibilityHandle: (state, action) => {
      state.addDepartmentModalIsVisible = action.payload;
    },
    getDepartments: (state, action) => {
      state.department = action.payload;
    },
    filterHandle: (state, action) => {
      state.filter = action.payload;
    },
    removeDepartmentFromDepartments: (state, action) => {
      const deps = current(state.department);
      state.department.docs = deps.docs.filter(
        (dep: any) => dep._id != action.payload
      );
    },

    addDepartmentFromDepartments: (state, action) => {
      const deps = current(state.department);
      state.department.docs = deps.docs.push(action.payload);
    },
  },
  
});

export const departmentActions = departmentSlice.actions;
export default departmentSlice.reducer;
