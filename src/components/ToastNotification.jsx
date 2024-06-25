// src/components/ToastNotification.jsx
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ToastNotification = ({ messages, delay }) => {
  const [displayedMessages, setDisplayedMessages] = useState([]);

  useEffect(() => {
    const showMessage = (message, index) => {
      setTimeout(() => {
        if (!displayedMessages.includes(message)) {
          toast(message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setDisplayedMessages((prev) => [...prev, message]);
        }
      }, index * delay);
    };

    messages.forEach((message, index) => {
      showMessage(message, index);
    });
  }, [messages, delay, displayedMessages]);

  return (
    <>
      <ToastContainer
        className="mt-16"
        toastClassName="relative flex p-2 min-h-10 rounded-md justify-between overflow-hidden cursor-pointer bg-white shadow-lg w-80 md:w-96"
        bodyClassName="text-sm text-gray-900 font-med block p-3"
        closeButton={false}
      />
    </>
  );
};

export default ToastNotification;
