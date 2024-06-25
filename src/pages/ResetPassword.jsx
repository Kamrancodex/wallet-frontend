import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "../components/InputField";
import { resetPassword } from "../api";

function ResetPassword() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleResetPassword = async (event) => {
    event.preventDefault();
    setLoading(true);
    setErrorMessage("");

    try {
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get("token");

      const response = await resetPassword({ ...formData, token });
      if (response.status === 200) {
        navigate("/signin");
      } else {
        setErrorMessage(
          response.data.message ||
            "Failed to update password. Please try again."
        );
      }
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message ||
          "Failed to update password. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#010813] via-[#010813] to-gray-900 text-white">
      <div className="bg-white flex flex-col rounded-lg shadow-lg overflow-hidden sm:max-w-lg w-full mx-6 p-8">
        <h1 className="text-2xl font-bold text-center mb-4 text-gray-900">
          Reset Password
        </h1>
        {errorMessage && (
          <p className="text-l font-bold text-center mb-4 text-red-500">
            {errorMessage}
          </p>
        )}
        <form className="space-y-6" onSubmit={handleResetPassword}>
          <InputField
            type="password"
            placeholder="New Password"
            label="New Password"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
          />
          <InputField
            type="password"
            placeholder="Confirm Password"
            label="Confirm Password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          <div className="flex justify-center">
            <button
              type="submit"
              className={`bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-2 px-4 rounded-lg focus:outline-none focus:ring focus:ring-indigo-500 focus:ring-offset-2 transition duration-150 ease-in-out w-full ${
                loading ? "cursor-not-allowed" : ""
              }`}
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <svg
                    className="animate-spin h-5 w-5 mr-3"
                    viewBox="0 0 24 24"
                  >
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
                "Update Password"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
