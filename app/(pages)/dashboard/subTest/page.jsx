"use client";
import SubTestDataTable from "@/app/components/subTest/view";
import React from "react";

function page({ searchParams }) {
  return <>{<SubTestDataTable page={searchParams.page} />}</>;
}
export default page;
