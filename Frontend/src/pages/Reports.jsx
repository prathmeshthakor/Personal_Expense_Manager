// import { useEffect, useState } from "react";
// import api from "../api/axios";

// function Reports() {
//   const [total, setTotal] = useState(0);
//   const [count, setCount] = useState(0);
//   const [highest, setHighest] = useState(0);

//   useEffect(() => {
//     const loadReport = async () => {
//       try {
//         const res = await api.get("/expense/get");
//         const expenses = res.data;

//         const amounts = expenses.map(e => Number(e.amount));
//         const totalAmount = amounts.reduce((a, b) => a + b, 0);
//         const maxExpense = amounts.length ? Math.max(...amounts) : 0;

//         setTotal(totalAmount);
//         setCount(expenses.length);
//         setHighest(maxExpense);
//       } catch (err) {
//         console.error("Report error", err.message);
//       }
//     };

//     loadReport();
//   }, []);

//   return (
//     <div className="page-wrapper">
//       <h1>Expense Reports</h1>

//       <div className="report-box">
//         <p><strong>Total Expenses:</strong> ₹{total}</p>
//         <p><strong>Total Entries:</strong> {count}</p>
//         <p><strong>Highest Expense:</strong> ₹{highest}</p>
//       </div>

//       <p className="ats-text">
//         This section provides analytical insights into user spending patterns,
//         including total expenditure, number of transactions, and highest expense.
//       </p>
//     </div>
    
//   );
// }

// export default Reports;
import { useEffect, useState } from "react";
import api from "../api/axios";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
);

function Reports() {
  const [expenses, setExpenses] = useState([]);
  const [total, setTotal] = useState(0);
  const [count, setCount] = useState(0);
  const [highest, setHighest] = useState(0);

  useEffect(() => {
    const loadReport = async () => {
      try {
        const res = await api.get("/expense/get");
        const data = res.data;

        const amounts = data.map((e) => Number(e.amount));
        const totalAmount = amounts.reduce((a, b) => a + b, 0);
        const maxExpense = amounts.length ? Math.max(...amounts) : 0;

        setExpenses(data);
        setTotal(totalAmount);
        setCount(data.length);
        setHighest(maxExpense);
      } catch (err) {
        console.error("Report error", err.message);
      }
    };

    loadReport();
  }, []);

  /*  Chart Data */
  
  const chartData = {
    labels: expenses.map((e) => e.title),
    datasets: [
      {
        label: "Expense Amount",
        data: expenses.map((e) => e.amount),
        backgroundColor: "#2563eb",
      },
    ],
  };

  return (
    <div className="page-wrapper">
      <h1>Expense Reports</h1>


  {/* Summary */}

      <div className="report-box">
        <p><strong>Total Expenses:</strong> ₹{total}</p>
        <p><strong>Total Entries:</strong> {count}</p>
        <p><strong>Highest Expense:</strong> ₹{highest}</p>
      </div>

      {/* // Chart Section */ }

      {expenses.length > 0 ? (
        <div className="chart-box">
          <Bar data={chartData} />
        </div>
      ) : (
        <p>No expense data available.</p>
      )}

      <p className="ats-text">
        This report visualizes expense distribution using bar charts and
        provides analytical insights into user spending patterns, total
        expenditure, and transaction frequency.
      </p>
    </div>
  );
}

export default Reports;
