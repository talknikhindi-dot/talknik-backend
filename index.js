const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ Talknik DB Connected Successfully!'))
    .catch(err => console.log('❌ DB Connection Error: ' + err.message));

app.get('/', (req, res) => res.send('Talknik Engine is Live and Connected!'));

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log('🚀 Server running on port ' + PORT));
