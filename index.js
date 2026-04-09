const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const User = require('./models/User');

const app = express();
app.use(express.json());
app.use(cors());

// public फोल्डरमधील फाईल्स (test.html) दाखवण्यासाठी
app.use(express.static('public'));

// थेट डेटाबेस कनेक्शन
const mongoURI = "mongodb+srv://talknikhindi_db_user:JFdirClPXKXjHyBq@cluster0.svqt5mp.mongodb.net/talknik_db?retryWrites=true&w=majority";

mongoose.connect(mongoURI)
    .then(() => console.log('✅ Talknik DB Connected Successfully!'))
    .catch(err => console.log('❌ DB Connection Error: ' + err.message));

// Routes
app.get('/', (req, res) => res.send('<h1>Talknik Engine is Live!</h1><p>Visit <a href="/test.html">/test.html</a> to signup.</p>'));

app.post('/api/auth/signup', async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) return res.status(400).json({ error: "Fields missing" });
        const newUser = new User({ username, password });
        await newUser.save();
        res.status(201).json({ message: "User Created Successfully! ✅" });
    } catch (err) {
        res.status(400).json({ error: "User already exists or DB error" });
    }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log('🚀 Server running on port ' + PORT));
