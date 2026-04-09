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
    .then(() => console.log('✅ Connected to Talknik Cloud DB!'))
    .catch(err => console.log('❌ DB Error: ', err.message));

const User = mongoose.model('User', new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
}));

app.post('/api/auth/signup', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newUser = new User({ username: req.body.username, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ success: true, message: "Account Created Successfully!" });
    } catch (e) { res.status(400).json({ success: false, message: "Username already exists!" }); }
});

app.post('/api/auth/login', async (req, res) => {
    const user = await User.findOne({ username: req.body.username });
    if (user && await bcrypt.compare(req.body.password, user.password)) {
        res.json({ success: true, message: "Login Successful! Welcome to Talknik." });
    } else { res.status(401).json({ success: false, message: "Invalid Credentials!" }); }
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log('---------------------------------------------------');
    console.log('🚀 RUNNING: http://localhost:' + PORT);
    console.log('---------------------------------------------------');
});
