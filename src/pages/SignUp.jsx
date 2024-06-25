import { Link, useNavigate } from "react-router-dom";
import InputField from "../components/InputField";
import { signup } from "../api";
import { useState } from "react";
import ToastNotification from "@/components/ToastNotification";

function SignUp() {
  const messages = [
    "Sorry if you are not able to signup its due to the smtp server",
    "Limit of free smtps are few emails per day",
  ];
  const navigate = useNavigate();

  // State to handle form inputs
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSignUp = async (event) => {
    event.preventDefault();
    setLoading(true);
    setErrorMessage("");
    setErrors({});

    try {
      // Make API call to signup endpoint
      const response = await signup(formData);
      if (response.status === 201) {
        // Save email to local storage
        localStorage.setItem("email", formData.email);
        navigate("/verify");
      } else {
        setErrorMessage(
          response.data.message || "Signup failed. Please try again."
        );
      }
    } catch (error) {
      const { errors, message } = error.response?.data || {};
      setErrors(errors || {});
      setErrorMessage(message || "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#010813] via-[#010813] to-gray-900">
      <div className="bg-white flex rounded-lg shadow-lg overflow-hidden sm:max-w-4xl w-full mx-6">
        <div className="w-full lg:w-1/2 p-8">
          <ToastNotification messages={messages} delay={3000} />
          <h1 className="text-2xl font-bold text-center mb-4">
            Create an Account
          </h1>
          <p className="text-l font-bold text-center mb-4 text-red-500">
            {errorMessage}
          </p>
          <form className="space-y-6" onSubmit={handleSignUp}>
            <div className="md:grid grid-cols-2 gap-6">
              <InputField
                type="text"
                placeholder="First Name"
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className={errors.firstName ? "border-red-500" : ""}
                error={errors.firstName}
              />
              <InputField
                type="text"
                placeholder="Last Name"
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className={errors.lastName ? "border-red-500" : ""}
                error={errors.lastName}
              />
            </div>
            <InputField
              type="email"
              placeholder="Email"
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? "border-red-500" : ""}
              error={errors.email}
            />
            <InputField
              type="password"
              placeholder="Password"
              label="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={errors.password ? "border-red-500" : ""}
              error={errors.password}
            />
            <InputField
              type="password"
              placeholder="Confirm Password"
              label="Confirm Password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={errors.confirmPassword ? "border-red-500" : ""}
              error={errors.confirmPassword}
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
                  "Sign Up"
                )}
              </button>
            </div>
          </form>

          <p className="mt-8 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to="/signin"
              className="text-indigo-600 font-medium hover:text-indigo-500"
            >
              Login Here
            </Link>
          </p>
        </div>

        <div
          className="hidden lg:block lg:w-1/2 bg-cover bg-center relative"
          style={{ backgroundImage: `url('/src/assets/images/signinbg.jpg')` }}
        >
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-8 space-y-4">
            <h2 className="text-2xl font-bold">Join Us Today</h2>
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

export default SignUp;
