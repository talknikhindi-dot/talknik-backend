const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const User = require('./models/User');

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static('public'));

const mongoURI = "mongodb+srv://talknikhindi_db_user:JFdirClPXKXjHyBq@cluster0.svqt5mp.mongodb.net/talknik_db?retryWrites=true&w=majority";

mongoose.connect(mongoURI).then(() => console.log('✅ DB Connected'));

app.get('/', (req, res) => res.send('Talknik Engine Live!'));

// Signup API
app.post('/api/auth/signup', async (req, res) => {
    try {
        const { username, password } = req.body;
        const newUser = new User({ username, password });
        await newUser.save();
        res.status(201).json({ message: "Account Created! ✅" });
    } catch (err) { res.status(400).json({ error: "User already exists" }); }
});

// Login API
app.post('/api/auth/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username, password });
        if (user) {
            res.json({ message: "Login Successful! 🚀", user: user.username });
        } else {
            res.status(401).json({ error: "Invalid Credentials" });
        }
    } catch (err) { res.status(500).json({ error: "Server Error" }); }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log('Running on ' + PORT));
