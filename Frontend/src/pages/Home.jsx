import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

function Home() {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [summary, setSummary] = useState({ total: 0, count: 0 });
  const [dateTime, setDateTime] = useState("");

  //  Auth check
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (!storedUser || !token) {
      window.location.href = "/login";
      return;
    }

    setUser(JSON.parse(storedUser));
  }, []);

  //....... Date & Time .......//
  useEffect(() => {
    const timer = setInterval(() => {
      setDateTime(new Date().toLocaleString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  //  Expense Summary
  useEffect(() => {
    // const token = localStorage.getItem("token");
    // if (!token) return;

    const loadSummary = async () => {
      try {
        const res = await api.get("/expense/get");
        const expense = res.data;

        const total = expense.reduce(
          (sum, e) => sum + Number(e.amount),
          0
        );
        setSummary({ total, count:expense.length });
      } catch (err) {
        console.error("Expense summary error", err.message);
      }
    };

    loadSummary();
  }, []);

  // 🚪 Logout
  const handleLogout = () => {
    localStorage.clear();
    // window.location.href = "/login";
    navigate("/login");
  };

  return (
    <div className="home-wrapper">
      <div className="home-card">
        <header className="home-header">
          <h1>Welcome, {user.name}</h1>
        </header>

        <p className="datetime">📅 {dateTime}</p>

        <div className="summary">
          <div className="box">
            <h3>Total Expenses</h3>
            <p>₹{summary.total}</p>
          </div>
          <div className="box">
            <h3>Total Entries</h3>
            <p>{summary.count}</p>
          </div>
        </div>

        <div className="features">
          <div onClick={() => navigate("/reports")}>📊 Charts & Reports</div>
          <div onClick={() => navigate("/history")}>🕒 Date & Time History</div>
        </div>

        <button
          className="go-btn"
          onClick={() => navigate("/expense")}
        >
          Go to Expense Manager →
        </button>

        
        <button
          onClick={handleLogout}
          className="logout-btn"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Home;
