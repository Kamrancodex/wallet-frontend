import React from "react";

function BalanceOverview({ balance, mortgage, expectingAmount, openModal }) {
  return (
    <div className="bg-white rounded-lg p-4 lg:p-6 shadow-lg">
      <h2 className="text-lg lg:text-xl font-bold mb-2 lg:mb-4">My Balance</h2>
      <p className="text-2xl lg:text-3xl font-bold mb-2">${balance}</p>
      <p className="text-green-500 mb-4">4.5% vs last month</p>
      <div className="flex space-x-2 lg:space-x-4 mb-4">
        <button
          className="bg-green-500 text-white py-2 px-4 rounded-lg"
          onClick={() => openModal("Send Money", "")}
        >
          Send Money
        </button>
        <button
          className="bg-yellow-500 text-white py-2 px-4 rounded-lg"
          onClick={() => openModal("Request Money", "")}
        >
          Request Money
        </button>
      </div>
      <div className="grid grid-cols-2 gap-2 lg:gap-4 mb-4">
        <div className="bg-gray-100 p-2 lg:p-4 rounded-lg">
          <p>Total Balance</p>
          <p>${balance}</p>
        </div>
        <div className="bg-gray-100 p-2 lg:p-4 rounded-lg">
          <p>Mortgage</p>
          <p>${mortgage}</p>
        </div>
        <div className="bg-gray-100 p-2 lg:p-4 rounded-lg">
          <p>Expecting Amount</p>
          <p>${expectingAmount}</p>
        </div>
      </div>
    </div>
  );
}

export default BalanceOverview;
