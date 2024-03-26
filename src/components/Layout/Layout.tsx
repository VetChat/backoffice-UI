import React from "react";
import Sidebar from "../Sidebar/Sidebar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <React.StrictMode>
      <div className="relative h-screen w-screen">
        <div className="flex h-full w-full">
          <Sidebar />
          {children}
        </div>
      </div>
    </React.StrictMode>
  );
};

export default Layout;
