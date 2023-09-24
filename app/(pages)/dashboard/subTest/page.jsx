"use client";
import SubTestDataTable from "@/app/components/subTest/view";
import useLogin from "@/app/hooks/useLogin";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

function page({ searchParams }) {

  return <>{<SubTestDataTable page={searchParams.page} />}</>;
}
export default page;
