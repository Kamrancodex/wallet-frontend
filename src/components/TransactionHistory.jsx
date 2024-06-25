import React from "react";

function TransactionHistory({ transactions }) {
  const formatDate = (date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "text-green-500";
      case "Failed":
        return "text-red-500";
      case "Processing":
        return "text-blue-500";
      default:
        return "text-gray-500";
    }
  };

  return (
    <div className="mt-4 space-y-4">
      {transactions.map((transaction) => (
        <div
          key={transaction._id} // Use the unique ID of each transaction as the key
          className="flex flex-col lg:flex-row justify-between p-4 bg-white shadow-md border border-gray-200 rounded-lg"
        >
          <span className="text-gray-700">{transaction._id}</span>
          <span>{formatDate(new Date(transaction.date))}</span>
          <span>{transaction.purpose}</span>
          <span
            className={`font-semibold ${getStatusColor(transaction.status)}`}
          >
            {transaction.status}
          </span>
        </div>
      ))}
    </div>
  );
}

export default TransactionHistory;
