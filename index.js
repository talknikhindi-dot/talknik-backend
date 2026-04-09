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

mongoose.connect(mongoURI)
    .then(() => console.log('✅ Talknik DB Connected!'))
    .catch(err => console.log('❌ DB Error: ' + err.message));

app.get('/', (req, res) => res.send('Talknik Engine is Live! Visit /test.html'));

app.post('/api/auth/signup', async (req, res) => {
    try {
        const { username, password } = req.body;
        const newUser = new User({ username, password });
        await newUser.save();
        res.status(201).json({ message: "User Created Successfully! ✅" });
    } catch (err) {
        res.status(400).json({ error: "User already exists or error" });
    }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log('🚀 Server running on ' + PORT));
