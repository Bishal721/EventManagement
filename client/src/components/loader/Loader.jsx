import React from "react";
import loaderImg from "../../assets/loader.gif";
import ReactDOM from "react-dom";

const Loader = () => {
  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="relative z-[999]">
        <img src={loaderImg} alt="Loading..." />
      </div>
    </div>,
    document.getElementById("loader")
  );
};

export const SpinnerImage = () => {
  return (
    <div className="flex justify-center items-center  bg-black bg-opacity-10 flex-col w-full m-auto text-center">
      <img src={loaderImg} alt="Loading..." />
    </div>
  );
};

export default Loader;
