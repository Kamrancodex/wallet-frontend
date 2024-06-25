import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../components/InputField";
import { signin } from "../api";
import { useAuth } from "../contexts/AuthContext";
import ToastNotification from "../components/ToastNotification";

function SignIn() {
  const messages = [
    "📧testEmail: najarkamran212@gmail.com",
    "🔐password: Kam@1211",
  ];

  const navigate = useNavigate();
  const { setIsAuthenticated } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSignIn = async (event) => {
    event.preventDefault();
    setLoading(true);
    setErrorMessage("");

    try {
      const response = await signin(formData);
      if (response.status === 200) {
        localStorage.setItem("email", formData.email);
        localStorage.setItem("token", response.data.token); // Store the token in local storage
        setIsAuthenticated(true); // Set authentication state
        if (response.data.requiresOtp) {
          localStorage.setItem("context", "signin");
          navigate("/verify");
        } else {
          setTimeout(() => {
            navigate("/dashboard");
          }, 100); // Add a slight delay to ensure token is set
        }
      } else {
        setErrorMessage(
          response.data.message || "Signin failed. Please try again."
        );
      }
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "Signin failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#010813] via-[#010813] to-gray-900">
      <div className="bg-white flex rounded-lg shadow-lg overflow-hidden sm:max-w-4xl w-full mx-6">
        <div className="w-full lg:w-1/2 p-8">
          <ToastNotification messages={messages} delay={3000} />
          <h1 className="text-2xl font-bold text-center mb-4">Welcome Back</h1>
          {errorMessage && (
            <p className="text-l font-bold text-center mb-4 text-red-500">
              {errorMessage}
            </p>
          )}
          <form className="space-y-6" onSubmit={handleSignIn}>
            <InputField
              type="email"
              placeholder="Email"
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            <InputField
              type="password"
              placeholder="Password"
              label="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                />
                <span className="ml-2 text-sm text-gray-900">Remember me</span>
              </label>
              <Link
                to="/forgot-password"
                className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
              >
                Forgot password?
              </Link>
            </div>
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
                  "Sign In"
                )}
              </button>
            </div>
          </form>
          <p className="mt-8 text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-indigo-600 font-medium hover:text-indigo-500"
            >
              Sign Up Here
            </Link>
          </p>
        </div>
        <div
          className="hidden lg:block lg:w-1/2 bg-cover bg-center relative"
          style={{ backgroundImage: `url('/src/assets/images/signinbg.jpg')` }}
        >
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-8 space-y-4">
            <h2 className="text-2xl font-bold">Welcome back</h2>
            <p>Visit our Support Center</p>
            <p>View our Product Roadmap</p>
            <p>Check out the latest releases</p>
            <p>Join our Slack Community</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
