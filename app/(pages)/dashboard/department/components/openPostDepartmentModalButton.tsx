"use client"
import { departmentActions } from "@/app/redux/slices/department_slice";
import { Button } from "@material-tailwind/react";
import { useDispatch } from "react-redux";

function OpenPostDepartmentModalButton() {
  const dispatch = useDispatch();
  return (
    <>
      <Button
        className=" bg-blue-500 text-white hover:text-blue-500"
        onClick={() => {
          dispatch(departmentActions.addDepartmentVisibilityHandle(true));
        }}
      >
        Add New department
      </Button>
    </>
  );
}

export default OpenPostDepartmentModalButton;
