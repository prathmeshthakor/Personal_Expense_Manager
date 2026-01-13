const Expense = require("../Model/Expense");

//  ADD EXPENSE //
exports.addExpense = async (req, res) => {
  try {
    const expense = await Expense.create({
      title: req.body.title,
      amount: req.body.amount,
      userId: req.user.id,
    });

    res.status(201).json(expense);
  } catch (err) {
    console.error("ADD EXPENSE ERROR ", err.message);
    res.status(500).json({ message: err.message });
  }
};


//  GET USER EXPENSES //
exports.getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({
      userId: req.user.id, 
    }).sort({ createdAt: -1 });

    res.json(expenses);
  } catch (err) {
    res.status(500).json({ message: "Error fetching expenses" });
  }
};

//  UPDATE // 
exports.updateExpense = async (req, res) => {
  try {
    const expense = await Expense.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body,
      { new: true }
    );

    res.json(expense);
  } catch (err) {
    res.status(500).json({ message: "Update failed" });
  }
};

//  DELETE //
exports.deleteExpense = async (req, res) => {
  try {
    await Expense.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });

    res.json({ message: "Expense deleted" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed" });
  }
};
