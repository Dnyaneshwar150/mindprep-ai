"use client";
import { ReactFlowProvider } from "@xyflow/react";
import Workflow from "./Workflow/Workflow";

export default function Home() {
  return (
    <div>
      <ReactFlowProvider>
        <Workflow />
      </ReactFlowProvider>
    </div>
  );
}
