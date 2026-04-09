const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(express.json());

const dbURI = "mongodb+srv://talknikhindi_db_user:JFdirClPXKXjHyBq@cluster0.svqt5mp.mongodb.net/talknik_db?retryWrites=true&w=majority";

mongoose.connect(dbURI)
    .then(() => console.log('✅ Talknik Engine: Database Connected Successfully!'))
    .catch(err => console.log('❌ Talknik Engine: Connection Failed -> ', err.message));

app.get('/', (req, res) => {
    res.send('<h1>🚀 Talknik IT Engine is Live & Connected!</h1>');
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
    console.log('🚀 Server is running on port ' + PORT);
});