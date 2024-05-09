// routes/protected.js
const express = require('express');
const authenticate = require('../middleware/authenticate');
const router = express.Router();
const mysql = require('mysql2');

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "studentlistdb",
  });
  
  db.connect(function (error) {
    if (error) {
      console.error("Error connecting to database:", error);
    } else {
      console.log("Database connected successfully");
    }
  });
  

// Protected route
router.get('/', authenticate, (req, res) => {
    res.send(`Welcome ${req.user.username}! you are in safe. no worry`);
});

// routes/protected.js
router.get("/studentslist", authenticate, (req, res) => {
    let sql = "SELECT * FROM students";
    db.query(sql, function (error, result) {
      if (error) {
        res.status(500).json({ status: false, message: "Error fetching data" });
      } else {
        res.status(200).json({ status: true, data: result });
      }
    });
});

module.exports = router;
