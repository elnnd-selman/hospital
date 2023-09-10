"use client";
import { Update } from "@/app/components/department/update";
import React from "react";

function page({ searchParams }: { searchParams: any }) {
  return (
    <>
      <Update id={searchParams.id} />
    </>
  );
}

export default page;
