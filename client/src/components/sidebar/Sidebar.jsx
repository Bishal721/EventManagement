import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTachometerAlt, FaCalendarPlus } from "react-icons/fa";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsCollapsed(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div
      className={`flex ${
        isCollapsed ? "w-20" : "w-64"
      } h-screen bg-gray-800 transition-width duration-300`}
    >
      <div className="flex flex-col h-full w-full">
        <div className="flex items-center justify-between p-4">
          <div
            className={`text-white text-xl ${isCollapsed ? "hidden" : "block"}`}
          >
            Event
          </div>
          <button
            onClick={toggleSidebar}
            className="text-white focus:outline-none"
          >
            <FaBars />
          </button>
        </div>
        <nav className="flex-1 px-2 py-4 space-y-1">
          <Link
            to="/admin/dashboard"
            className="flex items-center p-2 text-base font-medium text-white rounded-lg hover:bg-gray-700 hover:w-full"
          >
            <FaTachometerAlt
              className={`${isCollapsed ? "text-2xl" : "text-xl"}`}
            />
            <div className={`ml-3 ${isCollapsed ? "hidden" : "block"}`}>
              Dashboard
            </div>
          </Link>
          <Link
            to="/admin/createEvent"
            className="flex items-center p-2 text-base font-medium text-white rounded-lg hover:bg-gray-700 hover:w-full"
          >
            <FaCalendarPlus
              className={`${isCollapsed ? "text-2xl" : "text-xl"}`}
            />
            <div className={`ml-3 ${isCollapsed ? "hidden" : "block"}`}>
              Create Event
            </div>
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
