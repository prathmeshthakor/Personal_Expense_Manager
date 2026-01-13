const User = require("../Model/User");
const jwt = require("jsonwebtoken");

const JWT_SECRET = "secret123";

// REGISTER //
exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password)
    return res.status(400).json({ message: "All fields required" });

  const exist = await User.findOne({ email });
  if (exist)
    return res.status(400).json({ message: "User already exists" });

  await User.create({ name, email, password });

  res.status(201).json({ message: "User registered successfully" });
};

// LOGIN // 
exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ message: "All fields required" });

  const user = await User.findOne({ email });
  if (!user)
    return res.status(400).json({ message: "User not found" });

  if (password !== user.password)
    return res.status(400).json({ message: "Invalid credentials" });

  const token = jwt.sign({ id: user._id }, JWT_SECRET, {
    expiresIn: "7d"
  });

  res.json({
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email
    }
  });
};
