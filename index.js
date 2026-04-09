const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

// थेट रेंडरवरून घेतलेला पासवर्ड वापरला आहे
const mongoURI = "mongodb+srv://talknikhindi_db_user:JFdirClPXKXjHyBq@cluster0.svqt5mp.mongodb.net/talknik_db?retryWrites=true&w=majority";

mongoose.connect(mongoURI)
    .then(() => console.log('✅ Talknik DB Connected Successfully!'))
    .catch((err) => console.log('❌ DB Connection Error: ', err.message));

app.get('/', (req, res) => res.send('Talknik Engine Live!'));

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log('🚀 Talknik Engine running on ' + PORT));
