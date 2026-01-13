const router = require("express").Router();
const auth = require("../Middleware/authmiiddleware");
const {
  addExpense,
  getExpenses,
  updateExpense,
  deleteExpense,
} = require("../Controllers/expensecontroller");

//  AUTH  ALL EXPENSE ROUTES //
router.post("/post", auth, addExpense);
router.get("/get", auth, getExpenses);
router.put("/update/:id", auth, updateExpense);
router.delete("/delete/:id", auth, deleteExpense);

module.exports = router;
