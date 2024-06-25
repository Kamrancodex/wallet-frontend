// src/pages/Home.jsx
import React from "react";
import Features from "../components/Features";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import ToastNotification from "../components/ToastNotification";

function Home() {
  const messages = [
    "Tazeem just sent 200$ to Irfan💸",
    "Rohit just registered with us✔️",
    "Akshay became our 100th user 😍",
  ];

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      <ToastNotification messages={messages} delay={3000} />
      <Header />
      <HeroSection />
      <Features />
    </div>
  );
}

export default Home;
