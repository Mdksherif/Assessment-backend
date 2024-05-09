// server.js
const express = require("express");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/auth");
const protectedRoutes = require("./routes/protected");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const mysql = require("mysql2");
const app = express();
const PORT = process.env.PORT || 3000;

// body parser
app.use(bodyParser.json());

// Enable CORS
app.use(cors());

// Routes
app.use("/auth", authRoutes);
app.use("/protected", protectedRoutes);

//establish db connection

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
