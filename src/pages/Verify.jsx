import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../components/InputField";
import { verifyEmail, resendOtp } from "../api";

function Verify() {
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle OTP change
  const handleChange = (e) => {
    setOtp(e.target.value);
  };

  // Handle OTP verification
  const handleVerify = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    setMessage("");

    try {
      const email = localStorage.getItem("email");
      const context = localStorage.getItem("context"); // New line to get context (signup or signin)
      const response = await verifyEmail({ email, otp });

      if (response.status === 200) {
        setMessage("OTP verified successfully!");
        if (context === "signin") {
          navigate("/dashboard"); // Redirect to the dashboard if context is signin
        } else {
          navigate("/signin"); // Redirect to the login page if context is signup
        }
      } else {
        setErrorMessage("OTP verification failed. Please try again.");
      }
    } catch (error) {
      setErrorMessage("OTP verification failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Handle OTP resend
  const handleResend = async () => {
    setLoading(true);
    setErrorMessage("");
    setMessage("");

    try {
      const email = localStorage.getItem("email");
      const response = await resendOtp({ email });

      if (response.status === 200) {
        setMessage("OTP sent successfully.");
      } else {
        setErrorMessage("Failed to resend OTP. Please try again.");
      }
    } catch (error) {
      setErrorMessage("Failed to resend OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#010813] via-[#010813] to-gray-900 text-white">
      <div className="bg-white flex flex-col rounded-lg shadow-lg overflow-hidden sm:max-w-lg w-full mx-6 p-8">
        <h1 className="text-2xl font-bold text-center mb-4 text-gray-900">
          Verify Your Email
        </h1>
        {errorMessage && (
          <p className="text-l font-bold text-center mb-4 text-red-500">
            {errorMessage}
          </p>
        )}
        {message && (
          <p className="text-l font-bold text-center mb-4 text-green-500">
            {message}
          </p>
        )}
        <form className="space-y-6 w-full" onSubmit={handleVerify}>
          <InputField
            type="text"
            placeholder="Enter OTP"
            label="OTP"
            name="otp"
            value={otp}
            onChange={handleChange}
            className="mb-4"
          />
          <button
            type="submit"
            className={`bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-2 px-4 rounded-lg focus:outline-none focus:ring focus:ring-indigo-500 focus:ring-offset-2 transition duration-150 ease-in-out w-full ${
              loading ? "cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  ></path>
                </svg>
                Processing...
              </div>
            ) : (
              "Verify"
            )}
          </button>
        </form>
        <div className="flex justify-between items-center mt-4">
          <span className="text-sm text-gray-600">Didn't receive the OTP?</span>
          <button
            onClick={handleResend}
            className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
            disabled={loading}
          >
            Resend OTP
          </button>
        </div>
      </div>
    </div>
  );
}

export default Verify;
