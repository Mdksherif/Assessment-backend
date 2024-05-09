// routes/auth.js
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User  = require('../models/User')

const router = express.Router();

// Dummy user data (replace with database interactions)
const users = [];

// Signup route
router.post('/signup', (req, res) => {
    const { username, password } = req.body;
    // Hash the password
    bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
            return res.status(500).send('Error hashing password');
        }
        const newUser = new User(users.length + 1, username, hash);
        users.push(newUser);
        res.status(201).send('User created successfully');
        console.log("user created")
    });
});

// Login route
router.post('/login', (req, res) => {
    const { username, password } = req.body;
    // Find user by username
    const user = users.find(u => u.username === username);
    if (!user) {
        return res.status(404).send('User not found');
    }
    // Check password
    bcrypt.compare(password, user.password, (err, result) => {
        if (err || !result) {
            return res.status(401).send('Authentication failed');
        }
        // Generate JWT token
        const token = jwt.sign({ id: user.id, username: user.username }, 'qwertythesecretkey');
        res.status(200).json({ token });
        console.log("token generated")
    });
});

module.exports = router;
