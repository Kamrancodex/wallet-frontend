import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function IncomeExpensesChart({ transactions }) {
  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        label: "Income",
        data: [],
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
      },
      {
        label: "Expenses",
        data: [],
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        fill: true,
      },
    ],
  });

  useEffect(() => {
    const processData = () => {
      const incomeData = [];
      const expenseData = [];
      const labels = [];

      transactions.forEach((transaction) => {
        const date = new Date(transaction.date).toLocaleDateString();
        if (!labels.includes(date)) {
          labels.push(date);
        }
        if (transaction.amount > 0) {
          incomeData.push(transaction.amount);
          expenseData.push(0);
        } else {
          incomeData.push(0);
          expenseData.push(Math.abs(transaction.amount));
        }
      });

      setData({
        labels,
        datasets: [
          {
            label: "Income",
            data: incomeData,
            borderColor: "rgba(75, 192, 192, 1)",
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            fill: true,
          },
          {
            label: "Expenses",
            data: expenseData,
            borderColor: "rgba(255, 99, 132, 1)",
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            fill: true,
          },
        ],
      });
    };

    processData();
  }, [transactions]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Income and Expenses",
      },
    },
  };

  return (
    <div className="bg-white rounded-lg p-4 lg:p-6 shadow-lg">
      <Line data={data} options={options} />
    </div>
  );
}

export default IncomeExpensesChart;
