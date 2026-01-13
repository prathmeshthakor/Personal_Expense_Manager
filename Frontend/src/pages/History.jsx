import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";


function History() {
  const navigate = useNavigate();
  const [expenses, setExpenses] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("all");

  //  Auth check
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  //  Fetch expenses
  useEffect(() => {
    const loadExpenses = async () => {
      try {
        const res = await api.get("/expense/get");
        setExpenses(res.data);
      } catch (err) {
        console.error("History fetch error", err.message);
      }
    };

    loadExpenses();
  }, []);

  //  Monthly filter logic
  const filteredExpenses = expenses.filter((e) => {
    if (selectedMonth === "all") return true;
    return (
      new Date(e.createdAt).getMonth() === Number(selectedMonth)
    );
  });

  return (
    <div className="page-wrapper">
      <h1>Expense Date & Time History</h1>

      {/*  Month Filter */}
      <select
        value={selectedMonth}
        onChange={(e) => setSelectedMonth(e.target.value)}
        style={{
          marginBottom: "20px",
          padding: "10px",
          borderRadius: "6px",
          border: "1px solid #e5e7eb",
          fontSize: "14px",
        }}
      >
        <option value="all">All Months</option>
        <option value="0">January</option>
        <option value="1">February</option>
        <option value="2">March</option>
        <option value="3">April</option>
        <option value="4">May</option>
        <option value="5">June</option>
        <option value="6">July</option>
        <option value="7">August</option>
        <option value="8">September</option>
        <option value="9">October</option>
        <option value="10">November</option>
        <option value="11">December</option>
      </select>

      {filteredExpenses.length === 0 ? (
        <p>No expense history found.</p>
      ) : (
        <table className="history-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Amount</th>
              <th>Date & Time</th>
            </tr>
          </thead>
          <tbody>
            {filteredExpenses.map((e) => (
              <tr key={e._id}>
                <td>{e.title}</td>
                <td>₹{e.amount}</td>
                <td>
                  {new Date(e.createdAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <p className="ats-text">
        Displays a complete history of expenses with monthly
        filtering support, enabling users to review and audit
        spending activity efficiently.
      </p>
    </div>
  );
}

export default History;
