import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Expense from "./pages/Expense";
import Reports from "./pages/Reports";
import History from "./pages/History";

function App() {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setIsAuth(true);
  }, []);

  return (
    <Routes>
      <Route
        path="/login"
        element={
          isAuth ? <Navigate to="/" /> : <Login setIsAuth={setIsAuth} />
        }
      />

      <Route
        path="/signup"
        element={
          isAuth ? <Navigate to="/" /> : <Signup setIsAuth={setIsAuth} />
        }
      />

      <Route
        path="/"
        element={isAuth ? <Home /> : <Navigate to="/login" />}
      />

      <Route
        path="/expense"
        element={isAuth ? <Expense /> : <Navigate to="/login" />}
      />
      <Route
      path="/reports"
      element={isAuth ? <Reports /> : <Navigate to="/login" />} />

      <Route path="/history"
      element={isAuth ? <History /> : <Navigate to="/login" />} />
    </Routes>
  );
}

export default App;
