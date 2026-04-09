const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const User = require('./models/User');

const app = express();
app.use(express.json());
app.use(cors());

// रेंडरला सांगणे की फाईल्स 'public' फोल्डरमध्ये आहेत
app.use(express.static(path.join(__dirname, 'public')));

const mongoURI = "mongodb+srv://talknikhindi_db_user:JFdirClPXKXjHyBq@cluster0.svqt5mp.mongodb.net/talknik_db?retryWrites=true&w=majority";

mongoose.connect(mongoURI).then(() => console.log('✅ Talknik DB Connected!'));

// रूट पाथवर मेसेज दाखवणे
app.get('/', (req, res) => res.send('Talknik Backend is Running! Visit /test.html'));

// Signup आणि Login API
app.post('/api/auth/signup', async (req, res) => {
    try {
        const { username, password } = req.body;
        const newUser = new User({ username, password });
        await newUser.save();
        res.status(201).json({ message: "Account Created! ✅" });
    } catch (err) { res.status(400).json({ error: "User already exists" }); }
});

app.post('/api/auth/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username, password });
        if (user) res.json({ message: "Login Successful! 🚀" });
        else res.status(401).json({ error: "Invalid Credentials" });
    } catch (err) { res.status(500).json({ error: "Server Error" }); }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log('🚀 Server is Live on ' + PORT));
