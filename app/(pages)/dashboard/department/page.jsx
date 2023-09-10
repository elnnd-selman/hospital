"use client";
import React from "react";
import DepartmentDataTable from "../../../components/department/departmentTable";

function page({ searchParams }) {
  return <>{<DepartmentDataTable page={searchParams.page} />}</>;
}
export default page;
