const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const bcrypt = require('bcryptjs');

const app = express();
app.use(express.json());
app.use(cors());

// हे कोड मजकूर लपवण्यासाठी आणि फक्त वेबसाइट दाखवण्यासाठी महत्त्वाचे आहे
app.use(express.static(path.join(__dirname, 'public')));

const mongoURI = "mongodb+srv://talknikhindi_db_user:talknik2026@cluster0.svqt5mp.mongodb.net/talknik_db?retryWrites=true&w=majority";

mongoose.connect(mongoURI).then(() => console.log('✅ Talknik DB Connected')).catch(err => console.log('❌ Connection Error:', err));

const User = mongoose.model('User', new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
}));

app.post('/api/auth/signup', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newUser = new User({ username: req.body.username, password: hashedPassword });
        await newUser.save();
        res.json({ success: true, message: "Registered Successfully!" });
    } catch (e) { res.status(400).json({ success: false, message: "User exists" }); }
});

app.post('/api/auth/login', async (req, res) => {
    const user = await User.findOne({ username: req.body.username });
    if (user && await bcrypt.compare(req.body.password, user.password)) {
        res.json({ success: true, message: "Login Successful!" });
    } else { res.status(401).json({ success: false, message: "Invalid Credentials" }); }
});

app.get('*', (req, res) => { res.sendFile(path.join(__dirname, 'public', 'index.html')); });

app.listen(5000, () => console.log('🚀 Server running: http://localhost:5000'));
