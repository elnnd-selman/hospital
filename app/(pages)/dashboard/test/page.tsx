"use client";

import { AddTestModal } from "@/app/(pages)/dashboard/test/components/addTestModal";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import OpenPostDepartmentModalButton from "./components/openPostDepartmentModalButton";
import TestDataTable from "./components/testTable";
import { testActions } from "@/app/redux/slices/test_slice";

function department({ searchParams }: any) {
  const dispatch = useDispatch();

  const fetchTests = async () => {
    const res = await axios.get(
      `http://localhost:3000/api/test?page=${searchParams.page}`
    );
    dispatch(testActions.getTests(res.data.data));
  };

  useEffect(() => {
    fetchTests();
  }, [searchParams.page]);

  return (
    <div className="w-full p-10 flex flex-col  items-end">
      <AddTestModal />
      <OpenPostDepartmentModalButton />
      <TestDataTable page={searchParams.page} />
      {/* <DepartmentDataTable page={searchParams.page} /> */}
    </div>
  );
}

export default department;
