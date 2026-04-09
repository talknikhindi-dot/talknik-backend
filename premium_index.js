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
mongoose.connect(mongoURI).then(() => console.log('✅ Talknik Premium DB Connected')).catch(err => console.log('❌ DB Error:', err));

const User = mongoose.model('PremiumUser', new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isPremium: { type: Boolean, default: false }
}));

app.post('/api/premium/signup', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newUser = new User({ username: req.body.username, password: hashedPassword });
        await newUser.save();
        res.json({ success: true, message: "Premium Account Created!" });
    } catch (e) { res.status(400).json({ success: false, message: "User already exists" }); }
});

app.post('/api/premium/login', async (req, res) => {
    const user = await User.findOne({ username: req.body.username });
    if (user && await bcrypt.compare(req.body.password, user.password)) {
        res.json({ success: true, isPremium: user.isPremium, message: "Welcome to Premium Portal!" });
    } else { res.status(401).json({ success: false, message: "Access Denied!" }); }
});

app.post('/api/premium/upgrade', async (req, res) => {
    await User.findOneAndUpdate({ username: req.body.username }, { isPremium: true });
    res.json({ success: true, message: "Payment Successful! Premium Unlocked." });
});

app.get('/', (req, res) => { res.sendFile(path.join(__dirname, 'public', 'premium.html')); });

app.listen(5000, () => console.log('🚀 Premium Project running on: http://localhost:5000'));
