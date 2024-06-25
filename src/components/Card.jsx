import { useState } from "react";
import PaymentModal from "./PaymentModal";

const Card = ({
  cardType,
  cardInfo,
  creditLimit,
  creditBalance,
  credit,
  balance,
  pay,
}) => {
  const [showDetails, setShowDetails] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleShowDetails = () => {
    setShowDetails(!showDetails);
  };

  const handlePayCredit = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-4 justify-center items-center p-4">
      <div
        className="relative text-white rounded-lg shadow-xl p-4 w-80 h-48 bg-black bg-center"
        style={{
          backgroundImage: `url('/mnt/data/neumorphic-black-credit-card-template-design_1017-36082.avif')`,
          backgroundSize: "cover",
        }}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">{cardType}</h2>
          <button
            className="bg-gray-800 px-2 py-1 rounded"
            onClick={handleShowDetails}
          >
            {showDetails ? "Hide Details" : "Reveal Details"}
          </button>
        </div>
        {showDetails ? (
          <div>
            <p>{`Card Number: ${cardInfo.cardNumber}`}</p>
            <p>{`Expiry: ${new Date(
              cardInfo.expirationDate
            ).toLocaleDateString()}`}</p>
            <p>{`CVV: ${cardInfo.cvv}`}</p>
          </div>
        ) : (
          <div className="h-24 flex items-center justify-center">
            <p className="text-2xl">**** **** **** ****</p>
          </div>
        )}
      </div>
      <div>
        <p>{`${credit}: $${creditLimit}`}</p>
        <p>{`${balance}: $${creditBalance}`}</p>
        <button
          className="bg-blue-700 px-4 py-2 rounded mt-2"
          onClick={handlePayCredit}
        >
          {pay}
        </button>
      </div>

      <PaymentModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        creditBalance={creditBalance}
      />
    </div>
  );
};

export default Card;
