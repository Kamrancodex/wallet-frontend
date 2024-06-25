import React, { useEffect, useState } from "react";
import SideBar from "../components/SideBar";
import Button from "../components/Button";
import { FaSearch, FaPlus } from "react-icons/fa";
import { getUserTransactions } from "../api";

const TransactionsPage = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await getUserTransactions();
        console.log("API Response:", response);

        const data = response.data || response; // Handle both cases where response might contain data field or be directly the data

        if (Array.isArray(data)) {
          setTransactions(data);
        } else {
          console.error("Unexpected data format", data);
          setTransactions([]);
          setError("Unexpected data format");
        }
      } catch (error) {
        console.error("Failed to fetch transactions", error);
        setError("Failed to fetch transactions");
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      <SideBar className="w-full lg:w-1/5 hidden lg:block" />
      <div className="flex-1 p-4 lg:p-6">
        <div className="flex flex-col lg:flex-row justify-between items-center mb-6">
          <h1 className="text-2xl font-bold mb-4 lg:mb-0">Transactions</h1>
          <div className="flex flex-col lg:flex-row items-center space-y-2 lg:space-y-0 lg:space-x-4">
            <Button className="flex items-center space-x-2 bg-blue-600 text-white py-2 px-4 rounded-lg">
              <FaPlus />
              <span>Add Expense</span>
            </Button>
            <Button className="bg-blue-600 text-white py-2 px-4 rounded-lg">
              Scan Receipt
            </Button>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex flex-col lg:flex-row justify-between items-center mb-4 space-y-4 lg:space-y-0">
            <div className="flex items-center space-x-2 w-full lg:w-auto">
              <FaSearch />
              <input
                type="text"
                placeholder="Search by name, TXD ID..."
                className="border border-gray-300 rounded-lg p-2 flex-1"
              />
            </div>
            <div className="flex flex-col lg:flex-row items-center space-y-4 lg:space-y-0 lg:space-x-4 w-full lg:w-auto">
              <select className="border border-gray-300 rounded-lg p-2 w-full lg:w-auto">
                <option>Transaction Type</option>
              </select>
              <select className="border border-gray-300 rounded-lg p-2 w-full lg:w-auto">
                <option>All Status</option>
              </select>
              <input
                type="date"
                className="border border-gray-300 rounded-lg p-2 w-full lg:w-auto"
              />
            </div>
          </div>

          {loading ? (
            <div className="text-center">Loading...</div>
          ) : error ? (
            <div className="text-center text-red-500">{error}</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white">
                <thead>
                  <tr>
                    <th className="py-2 px-4 text-left">Transactions</th>
                    <th className="py-2 px-4 text-left">Date</th>
                    <th className="py-2 px-4 text-left">Amount</th>
                    <th className="py-2 px-4 text-left">Account</th>
                    <th className="py-2 px-4 text-left">Status</th>
                    <th className="py-2 px-4 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((transaction) => (
                    <tr key={transaction.id} className="border-b">
                      <td className="py-2 px-4">{transaction.name}</td>
                      <td className="py-2 px-4">{transaction.date}</td>
                      <td className="py-2 px-4">{transaction.amount}</td>
                      <td className="py-2 px-4">{transaction.account}</td>
                      <td className="py-2 px-4">
                        <span
                          className={`py-1 px-3 rounded-full text-white ${
                            transaction.status === "Accepted"
                              ? "bg-green-500"
                              : transaction.status === "Pending"
                              ? "bg-yellow-500"
                              : "bg-red-500"
                          }`}
                        >
                          {transaction.status}
                        </span>
                      </td>
                      <td className="py-2 px-4">
                        <Button className="bg-blue-600 text-white py-1 px-3 rounded-lg">
                          Details
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className="flex justify-between items-center mt-4">
            <span>Previous</span>
            <div className="flex space-x-2">
              {[...Array(10)].map((_, index) => (
                <span
                  key={index}
                  className="py-1 px-3 border border-gray-300 rounded-lg cursor-pointer"
                >
                  {index + 1}
                </span>
              ))}
            </div>
            <span>Next</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionsPage;
