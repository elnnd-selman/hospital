"use client";

import { AddTestModal } from "@/app/(pages)/dashboard/test/components/addTestModal";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { testActions } from "@/app/redux/slices/test_slice";
import { AddSubTestModal } from "./components/addSubTestModal";
import OpenPostSubTestModalButton from "./components/openPostDepartmentModalButton";

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
      <AddSubTestModal />
      <OpenPostSubTestModalButton />
      {/* <TestDataTable page={searchParams.page} /> */}
    </div>
  );
}

export default department;
