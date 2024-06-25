// src/pages/MainWallet.jsx
import React, { useState, useEffect } from "react";
import SideBar from "../components/SideBar";
import Button from "../components/Button";
import Card from "../components/Card";
import AddCardModal from "../components/AddCardModal";
import KycModal from "../components/KycModal";
import {
  getUserCards,
  applyForCreditCard,
  addDebitCard,
  kycVerification,
  getUserDetails,
} from "../api"; // Import API functions

const MainWallet = () => {
  const [kycModalOpen, setKycModalOpen] = useState(false);
  const [addCardModalOpen, setAddCardModalOpen] = useState(false);
  const [cards, setCards] = useState([]);
  const [creditCardIssued, setCreditCardIssued] = useState(false);
  const [activeCard, setActiveCard] = useState("Credit Card");
  const [kycStatus, setKycStatus] = useState(null);

  useEffect(() => {
    const fetchUserDataAndCards = async () => {
      try {
        const userDetails = await getUserDetails();
        setKycStatus(userDetails.data.kycStatus);

        const response = await getUserCards();
        setCards(response.data);
        setCreditCardIssued(
          response.data.some((card) => card.type === "credit")
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchUserDataAndCards();
  }, []);

  const handleKycSubmit = async (kycInfo) => {
    setKycStatus("in_process");
    setKycModalOpen(false);
    try {
      await kycVerification(kycInfo);
      setTimeout(async () => {
        const response = await getUserCards();
        setCards(response.data);
        setCreditCardIssued(true);
        setKycStatus("approved");
      }, 120000); // 2 minutes delay
    } catch (error) {
      console.error("Error during KYC verification:", error);
      setKycStatus("failed");
    }
  };

  const handleCreditCard = () => {
    setActiveCard("Credit Card");
  };

  const handleDebitCard = () => {
    setActiveCard("Debit Card");
  };

  const handleAddCardSubmit = async (cardInfo) => {
    try {
      console.log("Card Info:", cardInfo);
      const sanitizedCardInfo = {
        cardNumber: cardInfo.cardNumber,
        cvv: cardInfo.cvv,
        expirationDate: cardInfo.expirationDate,
      };
      await addDebitCard(sanitizedCardInfo);
      const response = await getUserCards();
      setCards(response.data);
      setAddCardModalOpen(false);
    } catch (error) {
      console.error("Error adding card:", error);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      <SideBar className="lg:w-1/4" />
      <div className="flex-1 p-4 lg:p-8">
        <div className="flex flex-col items-center mb-8">
          <h1 className="text-3xl font-bold mb-4 lg:mb-0">My Cards</h1>
          <div className="flex space-x-4 mb-4">
            <button
              onClick={handleCreditCard}
              className={`px-8 py-4 rounded-lg text-center text-white font-bold ${
                activeCard === "Credit Card"
                  ? "bg-blue-700 shadow-inner"
                  : "bg-blue-500"
              }`}
            >
              Credit Card
            </button>
            <button
              onClick={handleDebitCard}
              className={`px-8 py-4 rounded-lg text-center text-white font-bold ${
                activeCard === "Debit Card"
                  ? "bg-blue-700 shadow-inner"
                  : "bg-blue-500"
              }`}
            >
              Debit Card
            </button>
          </div>
        </div>

        <div className="flex flex-col items-center mb-8">
          {kycStatus === "in_process" && (
            <div className="bg-yellow-500 text-white p-4 rounded-lg mb-4">
              KYC approval is in process. Please wait for a few minutes.
            </div>
          )}
          {activeCard === "Credit Card" &&
            (creditCardIssued ? (
              cards
                .filter((card) => card.type === "credit")
                .map((card, index) => (
                  <Card
                    key={index}
                    cardType="Credit Card"
                    cardInfo={card}
                    credit="Credit Limit"
                    balance="Balance"
                    creditLimit={card.creditLimit}
                    creditBalance={card.balance}
                    pay="Pay Credit"
                  />
                ))
            ) : (
              <div className="flex flex-col justify-center items-center bg-slate-600 w-80 h-96 shadow-md ">
                <h3 className="text-lg font-semibold mb-4">
                  You don't have any card yet
                </h3>
                <Button
                  btnName="Apply for Credit Card"
                  onClick={() => setKycModalOpen(true)}
                  className="mb-4"
                />
              </div>
            ))}
          {activeCard === "Debit Card" &&
            cards
              .filter((card) => card.type === "debit")
              .map((card, index) => (
                <Card
                  key={index}
                  cardType="Debit Card"
                  cardInfo={card}
                  credit="Account Spending Limit"
                  balance="Available Balance"
                  creditLimit={card.creditLimit}
                  creditBalance={card.balance}
                  pay="Deposit Money"
                />
              ))}
        </div>

        <div className="flex flex-col items-center mb-8">
          <div className="flex flex-col items-center mb-4">
            <h2 className="text-2xl font-bold">Add Your Cards</h2>
            <Button
              btnName="Add Card"
              onClick={() => setAddCardModalOpen(true)}
              className="mt-4"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {cards
              .filter((card) => card.type === "user")
              .map((card, index) => (
                <Card key={index} cardType="User Card" cardInfo={card} />
              ))}
          </div>
        </div>

        <KycModal
          isOpen={kycModalOpen}
          onRequestClose={() => setKycModalOpen(false)}
          onSubmit={handleKycSubmit}
        />
        <AddCardModal
          isOpen={addCardModalOpen}
          onRequestClose={() => setAddCardModalOpen(false)}
          onSubmit={handleAddCardSubmit}
        />
      </div>
    </div>
  );
};

export default MainWallet;
