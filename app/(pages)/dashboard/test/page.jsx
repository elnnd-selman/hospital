"use client";
import TestDataTable from "@/app/components/test/view";
import React from "react";

function page({ searchParams }) {
  return <>{<TestDataTable page={searchParams.page} />}</>;
}
export default page;
