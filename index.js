const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const bcrypt = require('bcryptjs');

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

const mongoURI = "mongodb+srv://talknikhindi_db_user:talknik2026@cluster0.svqt5mp.mongodb.net/talknik_db?retryWrites=true&w=majority";

mongoose.connect(mongoURI)
    .then(() => console.log('✅ Talknik Cloud: Database Connected!'))
    .catch(err => console.log('❌ DB Error: ', err.message));

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});
const User = mongoose.model('User', userSchema);

// API for Signup
app.post('/api/auth/signup', async (req, res) => {
    try {
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ success: true, message: "Account Created!" });
    } catch (error) {
        res.status(400).json({ success: false, message: "Username exists!" });
    }
});

// API for Login
app.post('/api/auth/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (user && await bcrypt.compare(password, user.password)) {
        res.json({ success: true, message: "Access Granted!" });
    } else {
        res.status(401).json({ success: false, message: "Invalid Credentials!" });
    }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log('🚀 Engine Active on Port ' + PORT));
