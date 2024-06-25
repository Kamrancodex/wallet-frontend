import React from "react";

const Button = ({ btnName, onClick, className }) => {
  return (
    <button
      onClick={onClick}
      className={`bg-blue-700 px-4 py-2 text-white font-bold rounded-lg transition duration-300 ease-in-out transform hover:bg-blue-800 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 active:bg-blue-700 active:translate-y-0 ${className}`}
    >
      {btnName}
    </button>
  );
};

export default Button;
