import { SideBar } from "@/app/layouts/sideBar";
import React from "react";

function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      {children}
    </div>
  );
}

export default layout;
