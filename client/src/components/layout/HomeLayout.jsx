import React from "react";
import Navbar from "../navbar/Navbar";

const HomeLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className="md:min-w-[100px] min-h-[80vh] my-0 mx-auto  ">
        {children}
      </div>
    </>
  );
};

export default HomeLayout;
