const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

exports.registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        res.status(201).json({ 
            success: true, 
            message: "User " + name + " registered successfully in MVC!",
            hashed: hashedPassword 
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.loginUser = async (req, res) => {
    res.json({ success: true, message: "Login endpoint is ready!" });
};
