"use client";
import ViewInventory from "@/app/components/inventory/view";
import SubTestDataTable from "@/app/components/subTest/view";
import useLogin from "@/app/hooks/useLogin";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

function page({ searchParams }:{searchParams:any}) {

  return <>{<ViewInventory page={searchParams.page} />}</>;
}
export default page;
