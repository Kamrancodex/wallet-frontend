import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { confirmPayment, getRequestDetails } from "../api";

const PayRequest = () => {
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [requestDetails, setRequestDetails] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get("token");

    if (!token) {
      setMessage("Invalid payment link.");
      setLoading(false);
      return;
    }

    const validateToken = async () => {
      try {
        const response = await getRequestDetails(token);
        setRequestDetails(response.data);
      } catch (error) {
        setMessage("Invalid or expired token.");
      } finally {
        setLoading(false);
      }
    };

    validateToken();
  }, [location]);

  const handleConfirmPayment = async () => {
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get("token");

    try {
      const response = await confirmPayment(token);
      setMessage("Payment successful");
    } catch (error) {
      setMessage("Payment failed. Please try again.");
    }
  };

  const handleDeclinePayment = () => {
    navigate("/");
  };

  return (
    <div className="flex justify-center items-center h-screen">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="text-center">
          {requestDetails ? (
            <>
              <p>Requester: {requestDetails.requesterName}</p>
              <p>Email: {requestDetails.requesterEmail}</p>
              <p>Amount: {requestDetails.amount}</p>
              <button
                onClick={handleConfirmPayment}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded m-2"
              >
                Confirm Payment
              </button>
              <button
                onClick={handleDeclinePayment}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded m-2"
              >
                Decline Payment
              </button>
            </>
          ) : (
            <p>{message}</p>
          )}
          {message && (
            <div className="mt-4">
              {message === "Payment successful" ? (
                <div className="text-green-500">Sent Successfully</div>
              ) : (
                <div className="text-red-500">{message}</div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PayRequest;
