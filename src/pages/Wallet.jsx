import React, { useEffect, useState } from "react";
import BalanceChart from "../components/BalanceChart";
import SideBar from "../components/SideBar";
import BalanceModal from "../components/BalanceModal";
import Activity from "../components/Activity";
import BalanceOverview from "../components/BalanceOverview";
import IncomeExpensesChart from "../components/IncomeExpensesChart";
import InviteFriends from "../components/InviteFriends";
import {
  getUserDetails,
  getUserTransactions,
  sendMoney,
  requestMoney,
} from "../api";

function Wallet() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState({
    title: "",
    content: "",
  });

  const [user, setUser] = useState({});
  const [balance, setBalance] = useState({
    totalBalance: 0,
    mortgage: 0,
    expectingAmount: 0,
  });
  const [transactions, setTransactions] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userDetails = await getUserDetails();
        const userTransactions = await getUserTransactions();

        console.log("User Details: ", userDetails.data);
        console.log("User Transactions: ", userTransactions.data);

        setUser(userDetails.data);
        setBalance(userDetails.data.balance);
        setTransactions(userTransactions.data);
      } catch (error) {
        console.error("Error fetching user details or transactions:", error);
      }
    };

    fetchData();
  }, []);

  const openModal = (title, content) => {
    setModalContent({ title, content });
    setModalIsOpen(true);
    setErrorMessage("");
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleSendMoney = async ({ amount, recipient, currency, method }) => {
    if (!amount || !recipient || !currency || !method) {
      setErrorMessage("All fields are required.");
      return;
    }

    if (amount > balance.totalBalance) {
      setErrorMessage("Amount exceeds your available balance.");
      return;
    }

    try {
      await sendMoney({ amount, recipient, currency, method });

      closeModal();
      const userDetails = await getUserDetails();
      const userTransactions = await getUserTransactions();
      setBalance(userDetails.data.balance);
      setTransactions(userTransactions.data);
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Error sending money.");
    }
  };

  const handleRequestMoney = async ({
    amount,
    recipient,
    currency,
    method,
  }) => {
    if (!amount || !recipient || !currency || !method) {
      setErrorMessage("All fields are required.");
      return;
    }

    try {
      await requestMoney({ amount, recipient, currency, method });
      closeModal();
      const userDetails = await getUserDetails();
      const userTransactions = await getUserTransactions();
      setBalance(userDetails.data.balance);
      setTransactions(userTransactions.data);
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "Error requesting money."
      );
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col lg:flex-row min-h-screen lg:space-x-96">
      <SideBar />
      <div className="flex flex-col flex-1 p-4 lg:p-6 lg:w-10/12 bg-gray-100">
        <header className="mb-4 lg:mb-6">
          <h1 className="text-xl lg:text-2xl font-bold">Overview</h1>
          <p className="text-sm lg:text-base">
            Welcome back, {user.firstName} {user.lastName}!
          </p>
        </header>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
          <div className="lg:col-span-2">
            <BalanceOverview
              balance={balance.totalBalance}
              mortgage={balance.mortgage}
              expectingAmount={balance.expectingAmount}
              openModal={(title, content) => openModal(title, content)}
            />
          </div>
          <div>
            <div className="bg-white rounded-lg p-4 lg:p-6 shadow-lg mb-4 lg:mb-6">
              <h2 className="text-lg lg:text-xl font-bold mb-2 lg:mb-4">
                History
              </h2>
              <p className="text-2xl lg:text-3xl font-bold mb-2">
                ${balance.totalBalance}
              </p>
              <p className="text-red-500 mb-4">17.78% vs last month</p>
              <BalanceChart />
            </div>
            <IncomeExpensesChart transactions={transactions} />
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6 mt-4 lg:mt-6">
          <div className="lg:col-span-2">
            <Activity transactions={transactions} />
          </div>
          <div>
            <InviteFriends />
          </div>
        </div>
      </div>
      <BalanceModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        title={modalContent.title}
        content={modalContent.content}
        onSubmit={
          modalContent.title === "Send Money"
            ? handleSendMoney
            : handleRequestMoney
        }
        errorMessage={errorMessage}
      />
    </div>
  );
}

export default Wallet;
