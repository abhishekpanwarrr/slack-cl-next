"use client";
import { ReactNode } from "react";
import ToolBar from "./toolbar";

const WorkSpacePageIdLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="h-full">
      <ToolBar />
      {children}
    </div>
  );
};

export default WorkSpacePageIdLayout;
