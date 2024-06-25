import React from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const FullscreenLoader = ({ loading }) => {
  return (
    loading && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <AiOutlineLoading3Quarters className="text-5xl animate-spin text-white" />
      </div>
    )
  );
};

export default FullscreenLoader;
