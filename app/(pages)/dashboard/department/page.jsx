"use client";
import React from "react";
import DepartmentDataTable from "../../../components/department/view";

function page({ searchParams }) {
  return <>{<DepartmentDataTable page={searchParams.page} />}</>;
}
export default page;
