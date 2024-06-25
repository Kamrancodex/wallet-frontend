import React, { useState } from "react";
import { sendResetLink } from "../api";
import InputField from "../components/InputField";

function ForgotPassword() {
  const [input, setInput] = useState("");
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    setMessage("");

    if (!input) {
      setErrorMessage("Please enter your email or phone number");
      setLoading(false);
      return;
    }

    try {
      const response = await sendResetLink({ input });

      if (response.status === 200) {
        setMessage(
          "Reset instructions sent successfully. Please check your email or phone."
        );
      } else {
        setErrorMessage("Failed to send reset instructions. Please try again.");
      }
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message ||
          "Failed to send reset instructions. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#010813] via-[#010813] to-gray-900">
      <div className="bg-white flex flex-col rounded-lg shadow-lg overflow-hidden sm:max-w-lg w-full mx-6 p-8">
        <h1 className="text-2xl font-bold text-center mb-4 text-gray-900">
          Forgot Password
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
        <form className="space-y-6 w-full" onSubmit={handleSubmit}>
          <InputField
            type="text"
            placeholder="Enter your email or phone number"
            label="Email or Phone Number"
            name="input"
            value={input}
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
              "Reset Password"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
