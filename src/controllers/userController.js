const User = require("../models/userModel");
const bcrypt = require("bcryptjs");

exports.register = async (req, res) => {
    try {
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, password: hashedPassword });
        await user.save();
        res.status(201).json({ message: "User Registered! 🚀" });
    } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (user && await bcrypt.compare(password, user.password)) {
            res.json({ message: "Login Success! ✅", user: { id: user._id, username: user.username } });
        } else {
            res.status(401).json({ message: "Invalid Credentials ❌" });
        }
    } catch (err) { res.status(500).json({ error: err.message }); }
};
