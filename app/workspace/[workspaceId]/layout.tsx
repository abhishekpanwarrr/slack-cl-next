"use client";
import { ReactNode } from "react";
import ToolBar from "./toolbar";
import Sidebar from "./sidebar";

const WorkSpacePageIdLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="h-full">
      <ToolBar />
      <div className="flex h-[calc(100vh-40px)]">
        <Sidebar />
        {children}
      </div>
    </div>
  );
};

export default WorkSpacePageIdLayout;
