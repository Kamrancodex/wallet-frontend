import axios from "axios";

// Define the base URL for your API
const API_URL = "http://localhost:8000/api/v1"; // Adjust this URL based on your backend URL

// Create an Axios instance with the base URL and default headers
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to include the authorization token if it exists
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Function to signup a new user
export const signup = async (data) => {
  localStorage.setItem("context", "signup");
  return api.post("/users/signup", data);
};

// Function to signup a new user
export const verifyEmail = (data) => api.post("/users/verify-email", data);

export const resendOtp = (data) => api.post("/users/resend-otp", data);

// Function to login a user
export const signin = async (data) => {
  localStorage.setItem("context", "signin");
  return api.post("/users/signin", data);
};

// Function to get user details
export const getUserDetails = () => {
  return axios.get(`${API_URL}/users/user-details`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

// Function to get user transactions
export const getUserTransactions = () => api.get("/users/transactions");

export const sendMoney = async ({
  amount,
  recipient,
  currency,
  accountType,
  method,
}) => {
  const response = await api.post("/payments/send-money", {
    recipientIdentifier: recipient,
    amount,
    currency,
    accountType,
    method,
  });
  return response.data;
};

// Function to request money
export const requestMoney = async ({ amount, recipient, currency, method }) => {
  const response = await api.post("/payments/request-money", {
    amount,
    recipient,
    currency,
    method,
  });
  return response.data;
};

//Function to reset password
export const sendResetLink = (data) => api.post("/users/send-reset-link", data);

// Function to reset password
export const resetPassword = (data) => api.post("/users/reset-password", data);

export const payRequest = async (token) => {
  const response = await api.get(`/payments/pay-request?token=${token}`);
  return response.data;
};

// Function to get request details using the token
export const getRequestDetails = async (token) => {
  const response = await api.get(`/payments/request-details?token=${token}`);
  return response;
};

// Function to confirm payment
export const confirmPayment = async (token) => {
  const response = await api.post(`/payments/pay-request`, { token });
  return response;
};

export const sendOtpToEmail = async (data) => {
  const response = await api.post(`/settings/sendOtp`, data);
  return response;
};
export const verifyEmailOtp = async (data) => {
  const response = await api.post(`/settings/update-email`, data);
  return response;
};
// API functions for sending OTP to phone and verifying phone OTP
export const sendOtpToPhone = async (data) => {
  const response = await api.post("/settings/update-phone", data);
  return response;
};

export const verifyPhoneOtp = async (data) => {
  const response = await api.post("/settings/verify-phone", data);
  return response;
};

export const updateAddress = async (data) => {
  const response = await api.post("/settings/update-address", data);
  return response;
};

export const updatePassword = async (data) => {
  console.log(data);
  const response = await api.post("/settings/update-password", data);
  return response;
};

export const applyForCreditCard = async () => {
  const response = await api.post("/cards/apply-credit-card");
  return response.data;
};

export const addDebitCard = async (cardInfo) => {
  const response = await api.post("/cards/add-debit-card", cardInfo);
  return response.data;
};

export const kycVerification = async (kycInfo) => {
  const response = await api.post("/cards/kyc-verification", kycInfo);
  return response.data;
};

export const getUserCards = async () => {
  return api.get("/cards/cards-details"); // Ensure this endpoint matches your backend route
};
export const uploadProfilePic = async (data) => {
  const response = await api.post("/settings/profilePic", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};
// Export default Axios instance

export default api;
