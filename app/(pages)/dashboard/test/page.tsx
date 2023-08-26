"use client";

import { AddTestModal } from "@/app/(pages)/dashboard/test/components/addTestModal";
import { departmentActions } from "@/app/redux/slices/department_slice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import OpenPostDepartmentModalButton from "./components/openPostDepartmentModalButton";

function department({ searchParams }: any) {
  const dispatch = useDispatch();

  const fetchDepartments = async () => {
    // const res = await axios.get(
    //   `http://localhost:3000/api/department?page=${searchParams.page}`
    // );
    // dispatch(departmentActions.getDepartments(res.data.data));
  };

  useEffect(() => {
    fetchDepartments();
  }, [searchParams.page]);

  return (
    <div className="w-full p-10 flex flex-col  items-end">
      <AddTestModal />
      <OpenPostDepartmentModalButton />
      {/* <DepartmentDataTable page={searchParams.page} /> */}
    </div>
  );
}

export default department;
