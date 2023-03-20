const express = require('express');
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const { isAuthenticated } = require('../middlewares/jwt');


// @desc    Login route
// @route   POST /auth/login
// @access  Public
router.post('/login', async function (req, res, next) {
    const { username, password } = req.body;
    if (!username || !password) {
      res.status(400).json({ message: "Provide email and password." });
      return;
    }
    try {
        const user = await User.findOne({ username: username })
        const match = await bcrypt.compare(password, user.hashedPassword);
        if (match) {
            const { id, username } = user;
            const payload = { id, username };
            const authToken = jwt.sign( 
                payload,
                process.env.TOKEN_SECRET,
                { algorithm: 'HS256', expiresIn: "24h" }
            );
            res.status(200).json({ authToken: authToken })
        } else {
            res.status(401).json({ message: "Incorrect credentials"});
        }
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error"});
    }
});

// @desc    Verify JWT stored on the client
// @route   get /auth/me
// @access  Public
router.get('/me', isAuthenticated, (req, res, next) => {
    res.status(200).json(req.payload);
});


module.exports = router;