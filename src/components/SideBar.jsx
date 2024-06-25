import React, { useEffect, useState } from "react";
import profilePlaceholder from "../assets/images/profile.jpg"; // Placeholder image
import MenuItems from "../components/MenuItems";
import { IoHome } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { FaCreditCard } from "react-icons/fa";
import { GrTransaction } from "react-icons/gr";
import { IoMdSettings } from "react-icons/io";
import { FaCheckCircle } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi"; // Import the logout icon
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import { getUserDetails } from "../api"; // Import API function to get user details

function SideBar() {
  const [userData, setUserData] = useState({
    firstName: "User",
    lastName: "",
    profilePic: profilePlaceholder,
    verified: false,
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await getUserDetails();
        setUserData({
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          profilePic: response.data.profilePic || profilePlaceholder,
          verified: response.data.verified,
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  // Logout function
  const handleLogout = () => {
    // Clear local storage
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("context");

    // Invalidate the session (if necessary, e.g., by calling an API)

    // Navigate to the home page
    navigate("/");
  };

  return (
    <div className="lg:flex  lg:flex-col bg-white  lg:h-screen shadow-lg lg:fixed lg:left-0 lg:top-0 lg:w-2/12">
      <div className="lg:hidden flex justify-between items-center p-4 bg-white shadow-md">
        <img
          className="h-12 w-12 rounded-full"
          src={userData.profilePic}
          alt="Profile"
        />
        <Link to="/settings" className="text-gray-700">
          <IoMdSettings className="h-6 w-6" />
        </Link>
      </div>
      <div className="hidden lg:flex lg:flex-col items-center p-4">
        <img
          className="h-12 w-12 rounded-full"
          src={userData.profilePic}
          alt="Profile"
        />
        <span className="font-semibold mt-2">
          {userData.firstName} {userData.lastName}
        </span>
        <div className="flex items-center space-x-1 text-green-500">
          <FaCheckCircle />
          <span>{userData.verified ? "Verified" : "Not Verified"}</span>
        </div>
      </div>
      <div className="flex lg:flex-col justify-around lg:mt-4 bg-white lg:bg-transparent fixed bottom-0 left-0 right-0 lg:relative">
        <MenuItems to="/dashboard" icon={<IoHome />} iconName="Summary" />
        <MenuItems to="/coming-soon" icon={<CgProfile />} iconName="Messages" />
        <MenuItems to="/wallet" icon={<FaCreditCard />} iconName="Payments" />
        <MenuItems
          to="/transactions"
          icon={<GrTransaction />}
          iconName="Transactions"
        />
        <MenuItems to="/profile" icon={<IoMdSettings />} iconName="Settings" />
        <MenuItems to="/cards" icon={<FaCreditCard />} iconName="Cards" />
        <div onClick={handleLogout} className="cursor-pointer">
          <MenuItems to="#" icon={<FiLogOut />} iconName="Logout" />
        </div>
      </div>
    </div>
  );
}

export default SideBar;
