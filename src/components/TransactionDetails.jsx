import React from "react";

const TransactionDetails = ({ transaction }) => {
  if (!transaction) {
    return (
      <div className="p-4 bg-white rounded-lg shadow-md h-full">
        <p>Select a transaction to see details</p>
      </div>
    );
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow-md h-full">
      <h2 className="text-xl font-bold mb-4">Transaction Details</h2>
      <p>{`Transaction ID: ${transaction.id}`}</p>
      <p>{`Amount: $${transaction.amount}`}</p>
      <p>{`Date: ${transaction.date}`}</p>
      <p>{`Paid To: ${transaction.paidTo.name}`}</p>
      <p>{`Email: ${transaction.paidTo.email}`}</p>
      <p>{`Balance Before: $${transaction.balanceBefore}`}</p>
      <p>{`Balance After: $${transaction.balanceAfter}`}</p>
    </div>
  );
};

export default TransactionDetails;
