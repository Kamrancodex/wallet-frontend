import React from "react";
import SideBar from "../components/SideBar";
import { FaRocket, FaTools, FaHourglassHalf } from "react-icons/fa";

function ComingSoon() {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-stone-100">
      <SideBar className="w-full lg:w-1/4" />
      <div className="flex-1 p-4 lg:p-8 flex flex-col items-center">
        <div className="text-center mb-8">
          <h1 className="text-3xl lg:text-5xl font-bold mb-4">Coming Soon</h1>
          <p className="text-lg lg:text-xl text-gray-600">
            We're working hard to bring you these amazing features.
          </p>
        </div>
        {/*<div className="flex flex-col lg:flex-row items-center lg:justify-between w-full">
          <img
            src={comingSoonImage}
            alt="Coming Soon"
            className="w-full lg:w-1/2 mb-8 lg:mb-0"
          />*/}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 w-full lg:w-1/2">
          <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center text-center">
            <FaRocket className="text-blue-500 text-6xl mb-4" />
            <h3 className="text-xl font-bold mb-2">Feature 1</h3>
            <p className="text-gray-600">
              Exciting new functionality to enhance your experience.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center text-center">
            <FaTools className="text-green-500 text-6xl mb-4" />
            <h3 className="text-xl font-bold mb-2">Feature 2</h3>
            <p className="text-gray-600">
              Powerful tools to make your tasks easier.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center text-center">
            <FaHourglassHalf className="text-yellow-500 text-6xl mb-4" />
            <h3 className="text-xl font-bold mb-2">Feature 3</h3>
            <p className="text-gray-600">
              Stay tuned for more updates coming your way.
            </p>
          </div>
        </div>
      </div>
    </div>
    // </div>
  );
}

export default ComingSoon;
