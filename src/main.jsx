import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Dashboard from "./pages/Dashboard";
import Wallet from "./pages/Wallet";
import Profile from "./pages/Profile";
import Cards from "./pages/Cards";
import Transactions from "./pages/Transactions";
import AboutUs from "./pages/AboutUs";
import FAQ from "./pages/FAQ";
import ComingSoon from "./pages/ComingSoon";
import ForgotPassword from "./pages/ForgetPassword";
import ResetPassword from "./pages/ResetPassword";
import PayRequest from "./pages/PayRequest";
import NotAuthorized from "./pages/NotAuthorized";
import ProtectedRoute from "./components/ProtectedRoute";
import "./index.css";
import { jwtDecode } from "jwt-decode";
import { AuthProvider } from "./contexts/AuthContext";
import Verify from "./pages/Verify";

const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    return false;
  }

  try {
    const { exp } = jwtDecode(token);
    if (Date.now() >= exp * 1000) {
      localStorage.removeItem("token");
      return false;
    }
    return true;
  } catch (error) {
    localStorage.removeItem("token");
    return false;
  }
};

const App = () => (
  <HashRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute
            element={<Dashboard />}
            isAuthenticated={isAuthenticated()}
          />
        }
      />
      <Route
        path="/wallet"
        element={
          <ProtectedRoute
            element={<Wallet />}
            isAuthenticated={isAuthenticated()}
          />
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute
            element={<Profile />}
            isAuthenticated={isAuthenticated()}
          />
        }
      />
      <Route
        path="/cards"
        element={
          <ProtectedRoute
            element={<Cards />}
            isAuthenticated={isAuthenticated()}
          />
        }
      />
      <Route
        path="/transactions"
        element={
          <ProtectedRoute
            element={<Transactions />}
            isAuthenticated={isAuthenticated()}
          />
        }
      />
      <Route path="/verify" element=<Verify /> />
      <Route path="/about-us" element={<AboutUs />} />
      <Route path="/faq" element={<FAQ />} />
      <Route path="/coming-soon" element={<ComingSoon />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/pay-request" element={<PayRequest />} />
      <Route path="/not-authorized" element={<NotAuthorized />} />
    </Routes>
  </HashRouter>
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
