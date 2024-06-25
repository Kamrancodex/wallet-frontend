import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
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

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/signin",
    element: <SignIn />,
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute
        element={<Dashboard />}
        isAuthenticated={isAuthenticated()}
      />
    ),
  },
  {
    path: "/wallet",
    element: (
      <ProtectedRoute
        element={<Wallet />}
        isAuthenticated={isAuthenticated()}
      />
    ),
  },
  {
    path: "/profile",
    element: (
      <ProtectedRoute
        element={<Profile />}
        isAuthenticated={isAuthenticated()}
      />
    ),
  },
  {
    path: "/cards",
    element: (
      <ProtectedRoute element={<Cards />} isAuthenticated={isAuthenticated()} />
    ),
  },
  {
    path: "/transactions",
    element: (
      <ProtectedRoute
        element={<Transactions />}
        isAuthenticated={isAuthenticated()}
      />
    ),
  },
  {
    path: "/about-us",
    element: <AboutUs />,
  },
  {
    path: "/faq",
    element: <FAQ />,
  },
  {
    path: "/coming-soon",
    element: <ComingSoon />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
  },
  {
    path: "/pay-request",
    element: <PayRequest />,
  },
  {
    path: "/not-authorized",
    element: <NotAuthorized />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
