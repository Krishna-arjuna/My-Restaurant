const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 5000;

// ✅ Middleware
app.use(cors());
app.use(bodyParser.json());

// ✅ Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/hotelDB", {
})
.then(() => console.log("✅ MongoDB connected"))
.catch(err => console.error("❌ MongoDB connection error:", err));

// ✅ User Schema
const userSchema = new mongoose.Schema({
  fname: String,
  lname: String,
  phone: String,
  address: String,
  email: { type: String, unique: true },
  password: String
});

const User = mongoose.model("User", userSchema);

// ======================= ROUTES ======================= //

// ✅ Signup Route
app.post("/signup", async (req, res) => {
  try {
    const { fname, lname, phone, address, email, password } = req.body;

    // check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists!" });
    }

    const newUser = new User({ fname, lname, phone, address, email, password });
    await newUser.save();

    res.json({ message: "Signup successful!" });
  } catch (err) {
    res.status(500).json({ error: "Signup failed", details: err.message });
  }
});

// ✅ Login Route
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "User not found!" });

    if (user.password !== password) {
      return res.status(400).json({ error: "Invalid password!" });
    }

    res.json({
      message: "Login successful!",
      user: {
        fname: user.fname,
        lname: user.lname,
        email: user.email
      }
    });
  } catch (err) {
    res.status(500).json({ error: "Login failed", details: err.message });
  }
});

// ✅ Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
