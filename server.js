// -------------------- IMPORTS --------------------
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { OAuth2Client } = require("google-auth-library");
const jwt = require("jsonwebtoken");

// -------------------- CONFIG --------------------
const app = express();
const PORT = 5000;

const CLIENT_ID = "1068739465758-mmhtsv0mo191vr5bbbuv077rbib6cv31.apps.googleusercontent.com";
const JWT_SECRET = "SUPER_SECRET_KEY"; // Change in production

const client = new OAuth2Client(CLIENT_ID);

// -------------------- MIDDLEWARE --------------------
app.use(cors());
app.use(bodyParser.json());

// -------------------- TEMPORARY IN-MEMORY DB --------------------
let users = [];

// -------------------- GOOGLE LOGIN --------------------
app.post("/verify-google-token", async (req, res) => {
  try {
    const { credential } = req.body;
    if (!credential) {
      return res.status(400).json({ error: "No token provided" });
    }

    // Verify Google Token
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: CLIENT_ID,
    });

    const payload = ticket.getPayload();

    const user = {
      name: payload.name,
      email: payload.email,
      picture: payload.picture,
      googleId: payload.sub,
    };

    // Generate JWT for session
    const token = jwt.sign(user, JWT_SECRET, { expiresIn: "1h" });

    res.json({ success: true, user, token });
  } catch (error) {
    console.error("❌ Error verifying token:", error);
    res.status(401).json({ error: "Invalid token" });
  }
});

// -------------------- NORMAL SIGNUP --------------------
app.post("/signup", (req, res) => {
  const { fname, lname, phone, address, email, password } = req.body;

  if (users.find((u) => u.email === email)) {
    return res.json({ error: "User already exists!" });
  }

  const newUser = { fname, lname, phone, address, email, password };
  users.push(newUser);

  console.log("Users:", users); // just to debug

  // Generate JWT for session
  const token = jwt.sign({ email: newUser.email, fname: newUser.fname }, JWT_SECRET, { expiresIn: "1h" });

  res.json({ message: "Signup successful!", user: newUser, token });
});

// -------------------- NORMAL LOGIN --------------------
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  const user = users.find((u) => u.email === email && u.password === password);

  if (!user) {
    return res.json({ error: "Invalid email or password!" });
  }

  // Generate JWT
  const token = jwt.sign({ email: user.email, fname: user.fname }, JWT_SECRET, { expiresIn: "1h" });

  res.json({ message: "Login successful!", user, token });
});

// -------------------- PROFILE (JWT PROTECTED) --------------------
app.get("/profile", (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: "No token provided" });

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    res.json({ success: true, user: decoded });
  } catch (error) {
    res.status(401).json({ error: "Invalid or expired token" });
  }
});

// -------------------- START SERVER --------------------
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
