import { useEffect, useState } from "react";
import api from "../api/axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";


function Expense() {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [expenses, setExpenses] = useState([]);
  const [editId, setEditId] = useState(null);
  const [message, setMessage] = useState("");

  //  FETCH EXPENSES
  const fetchExpenses = async () => {
    try {
      const res = await api.get("/expense/get");
      setExpenses(res.data);
    } catch (err) {
      setMessage("Failed to load expenses");
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  //  ADD / UPDATE EXPENSE
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editId) {
        await api.put(`/expense/update/${editId}`, { title, amount });
        setEditId(null);
      } else {
        await api.post("/expense/post", { title, amount });
      }

      setTitle("");
      setAmount("");
      fetchExpenses();
    } catch (err) {
      setMessage(err.response?.data?.message || "Error");
    }
  };

  //  EDIT
  const handleEdit = (exp) => {
    setTitle(exp.title);
    setAmount(exp.amount);
    setEditId(exp._id);
  };

  //  DELETE
  const handleDelete = async (id) => {
    try {
      await api.delete(`/expense/delete/${id}`);
      fetchExpenses();
    } catch {
      setMessage("Delete failed");
    }
  };

  //  TOTAL CALCULATION
  const total = expenses.reduce(
    (sum, exp) => sum + Number(exp.amount),
    0
  );

  //  CHART DATA
  const chartData = expenses.map((exp) => ({
    name: exp.title,
    amount: Number(exp.amount),
  }));

  //  DATE FORMAT FUNCTION
  const formatDateTime = (date) => {
    return new Date(date).toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short"
    });
  };

  return (
    <div className="container">
      <h2>💸 EXPENSE MANAGER</h2>
      <h3 className="total">Total: ₹{total}</h3>

      {message && <p className="error">{message}</p>}

      {/* ➕ ADD EXPENSE */}
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Expense title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <input
          placeholder="Amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />

        <button className="btn">
          {editId ? "Update Expense" : "Add Expense"}
        </button>
      </form>

      {/* 📊 CHART */}
      <div className="chart-box">
        <h3>Expense Chart</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="amount" fill="#4caf50" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* 📋 LIST */}
      <ul className="list">
        {expenses.map((exp) => (
          <li key={exp._id}>
            <div>
              <strong>{exp.title}</strong> – ₹{exp.amount}
              <br />
              <small>🕒 {formatDateTime(exp.createdAt)}</small>
            </div>

            <div>
              <button onClick={() => handleEdit(exp)}>✏️</button>
              <button onClick={() => handleDelete(exp._id)}>❌</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Expense;
