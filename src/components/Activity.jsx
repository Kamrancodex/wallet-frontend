import React from "react";

function Activity({ transactions }) {
  const recentTransactions = transactions.slice(0, 3); // Get the first 2-3 transactions

  return (
    <div className="bg-white rounded-lg p-4 lg:p-6 shadow-lg">
      <h2 className="text-lg lg:text-xl font-bold mb-2 lg:mb-4">
        Recent Activity
      </h2>
      {recentTransactions.map((transaction, index) => (
        <div key={index} className="mb-4">
          <div className="flex justify-between mb-2">
            <p className="font-bold">{transaction.purpose}</p>
            <p className="text-gray-600">
              {new Date(transaction.date).toLocaleDateString()}
            </p>
          </div>
          <div className="flex justify-between">
            <div>
              <p className="font-semibold">
                {transaction.recipientId.firstName}{" "}
                {transaction.recipientId.lastName}
              </p>
              <p className="text-gray-600 text-sm">
                {transaction.recipientId.email}
              </p>
            </div>
            <div>
              <p className="text-green-500">${transaction.amount}</p>
              <p
                className={`text-${
                  transaction.status === "Completed"
                    ? "green"
                    : transaction.status === "Failed"
                    ? "red"
                    : "blue"
                }-500`}
              >
                {transaction.status}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Activity;
