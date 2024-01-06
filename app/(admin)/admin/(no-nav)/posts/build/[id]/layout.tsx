import DesignerContextProvider from "@/context/DesignerContext";
import React, { ReactNode } from "react";

function layout({ children }: { children: ReactNode }) {
  return (
    <DesignerContextProvider>
      <div className="h-full w-full">{children}</div>
    </DesignerContextProvider>
  );
}

export default layout;
