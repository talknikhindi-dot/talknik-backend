const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(express.static('public'));

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ DB Connected Successfully'))
    .catch(err => console.log('❌ DB Error: ' + err.message));

app.post('/api/auth/login', (req, res) => {
    const { username, password } = req.body;
    // साधा टेस्ट लॉगिन
    if(username === 'admin' && password === 'talknik123') {
        res.json({ message: 'Login Success! Welcome to Talknik Engine.' });
    } else {
        res.status(401).json({ error: 'Invalid Credentials' });
    }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log('🚀 Server running on port ' + PORT));
