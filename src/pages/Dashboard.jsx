import React, { useEffect, useState } from "react";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import SideBar from "../components/SideBar";
import BalanceCards from "../components/BalanceCards";
import TransactionHistory from "../components/TransactionHistory";
import profile from "../assets/images/profile.jpg";
import { FaCheckCircle } from "react-icons/fa";
import { getUserDetails, getUserTransactions } from "../api";

function Dashboard() {
  const [balance, setBalance] = useState({
    totalBalance: 0,
    mortgage: 0,
    expectingAmount: 0,
  });
  const [transactions, setTransactions] = useState([]);
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userDetails = await getUserDetails();
        const userTransactions = await getUserTransactions();

        setUser(userDetails.data);
        setBalance(userDetails.data.balance);
        setTransactions(userTransactions.data);
        console.log(transactions);
      } catch (error) {
        console.error("Error fetching user details or transactions:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 lg:space-x-96">
      <header className="p-4 flex justify-between items-center bg-white shadow-md">
        <div className="flex items-center">
          <img className="h-12 w-12 rounded-full" src={profile} alt="Profile" />
          <div className="ml-3">
            <span className="font-semibold text-lg">
              {user.firstName} {user.lastName}
            </span>
            <div className="flex items-center text-green-500">
              <FaCheckCircle />
              <span className="ml-1">
                {user.verified ? "Verified" : "Not Verified"}
              </span>
            </div>
          </div>
        </div>
      </header>
      <div className="flex-1 p-4 lg:flex lg:flex-row">
        <div className="lg:w-9/12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-72 mb-8">
            <BalanceCards
              heading="Available Balance"
              amount={balance.totalBalance}
              icon={
                <IoIosArrowDroprightCircle className="h-6 w-6 text-blue-800" />
              }
            />
            <BalanceCards
              heading="Outstandings"
              amount={balance.mortgage}
              icon={
                <IoIosArrowDroprightCircle className="h-6 w-6 text-blue-800" />
              }
            />
            <BalanceCards
              heading="Expecting Amount"
              amount={balance.expectingAmount}
              icon={
                <IoIosArrowDroprightCircle className="h-6 w-6 text-blue-800" />
              }
            />
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Transaction History</h2>
            <div className="hidden lg:flex justify-between mb-2">
              <span className="font-medium">Transaction ID</span>
              <span className="font-medium">Date</span>
              <span className="font-medium">Purpose</span>
              <span className="font-medium">Status</span>
            </div>
            <TransactionHistory transactions={transactions} />
          </div>
        </div>
        <div className="hidden lg:block lg:w-1/3">
          <SideBar />
        </div>
      </div>
      <div className="lg:hidden">
        <SideBar />
      </div>
    </div>
  );
}

export default Dashboard;
