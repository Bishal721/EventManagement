import React from "react";
import { Outlet } from "react-router-dom";
import isAdminRedirect from "../customHooks/isAdminRedirect";
import Sidebar from "../sidebar/Sidebar";
import Navbar from "../navbar/Navbar";

export default function AdminLayout() {
  isAdminRedirect();
  return (
    <div className="bg-neutral-100 h-screen w-screen overflow-hidden flex flex-row">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Navbar />
        <div className="flex-1 p-4 min-h-0 overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
