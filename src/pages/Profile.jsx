import React, { useState, useEffect } from "react";
import InputField from "../components/InputField";
import SideBar from "../components/SideBar";
import Button from "../components/Button";
import { FaCheck, FaTimes, FaEdit } from "react-icons/fa";
import ProfileUpdateModel from "../components/ProfileUpdateModal";
import FullscreenLoader from "../components/FullScreenLoader";
import {
  getUserDetails,
  sendOtpToPhone,
  verifyPhoneOtp,
  sendOtpToEmail,
  verifyEmailOtp,
  updateAddress,
  updatePassword,
  uploadProfilePic,
} from "../api"; // Import API functions

function Profile() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalStep, setModalStep] = useState(1);
  const [modalField, setModalField] = useState("");
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    address: "",
    profilePic: "",
  });
  const [newValue, setNewValue] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [verificationMessage, setVerificationMessage] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [oldPassword, setOldPassword] = useState(""); // For password change
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const openModal = (field) => {
    setModalField(field);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalStep(1);
    setVerificationMessage("");
  };

  const closeSuccessModal = () => {
    setShowSuccessModal(false);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await getUserDetails();
        setUserData({
          firstName: response.data.firstName || "",
          lastName: response.data.lastName || "",
          email: response.data.email || "",
          phoneNumber: response.data.phoneNumber || "",
          address: response.data.address || "",
          profilePic: response.data.profilePic || "default-profile-pic-url",
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleProfilePicChange = () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";
    fileInput.onchange = async (event) => {
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append("profilePic", file);
      try {
        const response = await uploadProfilePic(formData);
        setUserData((prevData) => ({
          ...prevData,
          profilePic: response.profilePic,
        }));
      } catch (error) {
        console.error("Error uploading profile picture:", error);
      }
    };
    fileInput.click();
  };

  const handleSendCode = async () => {
    try {
      setLoading(true);
      if (modalField === "email") {
        const response = await sendOtpToEmail({ email: newValue });

        if (response.status === 200) {
          setModalStep(2);
        } else {
          alert("Failed to send OTP. Please try again.");
        }
      } else if (modalField === "phoneNumber") {
        const response = await sendOtpToPhone({ phoneNumber: newValue });
        if (response.status === 200) {
          setModalStep(2);
        } else {
          alert("Failed to send OTP. Please try again.");
        }
      }
      setLoading(false);
    } catch (error) {
      console.error("Error sending OTP:", error);
      setLoading(false);
    }
  };

  const handleVerifyCode = async () => {
    try {
      setLoading(true);
      const response =
        modalField === "email"
          ? await verifyEmailOtp({ otp: verificationCode })
          : await verifyPhoneOtp({ otp: verificationCode });
      if (response.status === 200) {
        setVerificationMessage("Verification successful!");
        setShowSuccessModal(true);
        setTimeout(() => {
          setShowSuccessModal(false);
          closeModal();
        }, 2000);
      } else {
        setVerificationMessage("Invalid OTP. Please try again.");
      }
      setLoading(false);
    } catch (error) {
      console.error("Error verifying OTP:", error);
      setVerificationMessage("Error verifying OTP. Please try again.");
      setLoading(false);
    }
  };

  const handleUpdateField = async () => {
    try {
      setLoading(true);
      if (modalField === "address") {
        const response = await updateAddress({ address: newValue });
        if (response.status === 200) {
          setUserData((prevData) => ({
            ...prevData,
            address: response.data.address,
          }));
          setVerificationMessage("Address updated successfully!");
        } else {
          setVerificationMessage("Error updating address. Please try again.");
        }
      }
      setLoading(false);
      setShowSuccessModal(true);
      setTimeout(() => {
        setShowSuccessModal(false);
        closeModal();
      }, 2000);
    } catch (error) {
      console.error("Error updating field:", error);
      setVerificationMessage("Error updating field. Please try again.");
      setLoading(false);
    }
  };

  const handleChangePassword = async () => {
    try {
      setLoading(true);
      if (newPassword !== confirmPassword) {
        setVerificationMessage("Passwords do not match!");
        setLoading(false);
        return;
      }
      await updatePassword({
        currentPassword: oldPassword,
        newPassword,
        confirmPassword,
      });
      setLoading(false);
      setVerificationMessage("Password updated successfully!");
      setShowSuccessModal(true);
      setTimeout(() => {
        setShowSuccessModal(false);
        closeModal();
      }, 2000);
    } catch (error) {
      console.error("Error updating password:", error);
      setVerificationMessage("Error updating password. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-stone-100 lg:space-x-96">
      <FullscreenLoader loading={loading} />
      <SideBar className="w-full lg:w-1/4" />
      <div className="flex-1 p-4 lg:p-8">
        <div className="flex flex-col lg:flex-row justify-between items-center mb-8">
          <h1 className="text-2xl lg:text-3xl font-bold">
            Account Information
          </h1>
          <input
            type="text"
            placeholder="Search"
            className="bg-gray-200 h-10 p-2 rounded-full mt-4 lg:mt-0"
          />
        </div>
        <div className="bg-white p-6 lg:p-8 rounded-lg shadow-lg">
          <div className="flex flex-col items-center mb-6 relative">
            <img
              src={userData.profilePic}
              alt="Profile"
              className="w-24 h-24 rounded-full mb-4 cursor-pointer border-4 border-blue-500 transition-transform transform hover:scale-105"
              onClick={handleProfilePicChange}
            />
            <FaEdit
              className="absolute bottom-4 right-0 bg-white text-blue-500 rounded-full p-1 cursor-pointer"
              onClick={handleProfilePicChange}
            />
            <div className="text-xl font-bold">
              {userData.firstName} {userData.lastName}
            </div>
            <div className="text-gray-500">{userData.email}</div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
            <div className="flex flex-col">
              <label className="mb-2 font-semibold">First Name</label>
              <div className="flex items-center">
                <input
                  type="text"
                  value={userData.firstName}
                  readOnly
                  className="bg-gray-100 p-2 rounded-md flex-1"
                />
                <button className="ml-2 text-gray-500">
                  <FaCheck />
                </button>
              </div>
            </div>
            <div className="flex flex-col">
              <label className="mb-2 font-semibold">Last Name</label>
              <div className="flex items-center">
                <input
                  type="text"
                  value={userData.lastName}
                  readOnly
                  className="bg-gray-100 p-2 rounded-md flex-1"
                />
                <button className="ml-2 text-gray-500">
                  <FaTimes />
                </button>
              </div>
            </div>
            <div className="flex flex-col">
              <label className="mb-2 font-semibold">Email</label>
              <div className="flex items-center">
                <input
                  type="email"
                  value={userData.email}
                  readOnly
                  className="bg-gray-100 p-2 rounded-md flex-1"
                />
                {/*<button
                  onClick={() => openModal("email")}
                  className="ml-2 bg-blue-500 text-white p-2 rounded-md"
                >
                  Update Email
                </button>*/}
                <FaCheck className="text-green-500 ml-2" title="Verified" />
              </div>
            </div>
            <div className="flex flex-col">
              <label className="mb-2 font-semibold">Phone Number</label>
              <div className="flex items-center">
                <input
                  type="text"
                  value={userData.phoneNumber}
                  readOnly
                  className="bg-gray-100 p-2 rounded-md flex-1"
                />
                <button
                  onClick={() => openModal("phoneNumber")}
                  className="ml-2 bg-blue-500 text-white p-2 rounded-md"
                >
                  Update/Add Number
                </button>
                <FaCheck className="text-green-500 ml-2" title="Verified" />
              </div>
            </div>
            <div className="flex flex-col">
              <label className="mb-2 font-semibold">Address</label>
              <div className="flex items-center">
                <input
                  type="text"
                  value={newValue}
                  onChange={(e) => setNewValue(e.target.value)}
                  placeholder="Enter Address"
                  className="bg-gray-100 p-2 rounded-md flex-1"
                />
                <button
                  onClick={handleUpdateField}
                  className="ml-2 bg-blue-500 text-white p-2 rounded-md"
                >
                  Update Address
                </button>
                <FaCheck className="text-green-500 ml-2" title="Verified" />
              </div>
            </div>
            <div className="flex flex-col">
              <label className="mb-2 font-semibold">Password</label>
              <div className="flex items-center">
                <input
                  type="password"
                  value="******"
                  readOnly
                  className="bg-gray-100 p-2 rounded-md flex-1"
                />
                <button
                  onClick={() => openModal("changePassword")}
                  className="ml-2 bg-blue-500 text-white p-2 rounded-md"
                >
                  Change Password
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <ProfileUpdateModel isOpen={isModalOpen} onRequestClose={closeModal}>
          <button
            onClick={closeModal}
            className="text-right text-red-500 absolute top-2 right-2"
          >
            X
          </button>
          {modalStep === 1 && modalField !== "changePassword" && (
            <div>
              <h2 className="text-lg font-bold mb-4">Send Verification Code</h2>
              <InputField
                type="text"
                value={newValue}
                onChange={(e) => setNewValue(e.target.value)}
                placeholder={`Enter ${modalField}`}
                label={modalField.charAt(0).toUpperCase() + modalField.slice(1)}
                className="mb-4"
              />
              <Button btnName="Send Code" onClick={handleSendCode} />
            </div>
          )}
          {modalStep === 2 && (
            <div>
              <h2 className="text-lg font-bold mb-4">Verify Code</h2>
              <InputField
                type="text"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                placeholder="Enter Code"
                label="Verification Code"
                className="mb-4"
              />
              <Button btnName="Verify Code" onClick={handleVerifyCode} />
              {verificationMessage && (
                <p className="text-red-500 mt-4">{verificationMessage}</p>
              )}
            </div>
          )}
          {modalStep === 3 && modalField !== "changePassword" && (
            <div>
              <h2 className="text-lg font-bold mb-4">
                Enter New{" "}
                {modalField.charAt(0).toUpperCase() + modalField.slice(1)}
              </h2>
              <InputField
                type="text"
                value={newValue}
                readOnly
                label={modalField.charAt(0).toUpperCase() + modalField.slice(1)}
                className="mb-4"
              />
              <Button btnName="Update" onClick={handleUpdateField} />
              <p className="text-green-500 mt-4">{verificationMessage}</p>
            </div>
          )}
          {modalField === "changePassword" && (
            <div>
              <h2 className="text-lg font-bold mb-4">Change Password</h2>
              <InputField
                type="password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                placeholder="Old Password"
                label="Old Password"
                className="mb-4"
              />
              <InputField
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="New Password"
                label="New Password"
                className="mb-4"
              />
              <InputField
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm Password"
                label="Confirm Password"
                className="mb-4"
              />
              <Button
                btnName="Change Password"
                onClick={handleChangePassword}
              />
              <p className="text-green-500 mt-4">{verificationMessage}</p>
            </div>
          )}
        </ProfileUpdateModel>
      )}
      {showSuccessModal && (
        <ProfileUpdateModel
          isOpen={showSuccessModal}
          onRequestClose={closeSuccessModal}
        >
          <div className="flex flex-col items-center">
            <button
              onClick={closeSuccessModal}
              className="text-right text-red-500 absolute top-2 right-2"
            >
              X
            </button>
            <FaCheck className="text-green-500 text-6xl mb-4" />
            <h2 className="text-lg font-bold">{verificationMessage}</h2>
          </div>
        </ProfileUpdateModel>
      )}
    </div>
  );
}

export default Profile;
