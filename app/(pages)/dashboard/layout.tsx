import { SideBar } from "@/app/components/sideBar";
import React from "react";

function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <SideBar />
      {children}
    </div>
  );
}

export default layout;
