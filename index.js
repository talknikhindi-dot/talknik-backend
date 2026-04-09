const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(express.json());

// डेटाबेस साखळी (Direct Connection)
mongoose.connect(process.env.MONGO_URI || "mongodb+srv://talknikhindi_db_user:JFdirClPXKXjHyBq@cluster0.svqt5mp.mongodb.net/talknik_db?retryWrites=true&w=majority")
    .then(() => console.log('✅ Talknik DB Connected!'))
    .catch(err => console.log('❌ DB Error: ' + err.message));

app.get('/', (req, res) => res.send('Talknik Engine is Live!'));

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log('🚀 Server running on ' + PORT));
