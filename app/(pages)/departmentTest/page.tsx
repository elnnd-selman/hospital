import AddResult from "@/app/components/departmentTest/create";
import React from "react";

async function page({ searchParams }: { searchParams: any }) {
  return <AddResult page={searchParams.page} />;
}

export default page;
