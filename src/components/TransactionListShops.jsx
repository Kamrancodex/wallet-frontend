import React from "react";

const TransactionListShops = ({ transactions, onSelectTransaction }) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md h-full overflow-y-auto">
      <h2 className="text-xl font-bold mb-4">Transactions at Shops</h2>
      {transactions.map((transaction) => (
        <div
          key={transaction.id}
          className="p-2 mb-2 border-b cursor-pointer hover:bg-gray-100"
          onClick={() => onSelectTransaction(transaction)}
        >
          <p>{`Transaction ID: ${transaction.id}`}</p>
          <p>{`Date: ${transaction.date}`}</p>
          <p>{`Description: ${transaction.description}`}</p>
          <p>{`Amount: $${transaction.amount}`}</p>
        </div>
      ))}
    </div>
  );
};

export default TransactionListShops;
