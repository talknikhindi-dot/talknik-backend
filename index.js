const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

// ????? ???? MongoDB Connection String
const URI = "mongodb+srv://talknik_admin:Admin12345@cluster0.svqt5mp.mongodb.net/talknik_db?retryWrites=true&w=majority";

mongoose.connect(URI)
    .then(() => console.log('? DATABASE CONNECTED SUCCESSFULLY'))
    .catch(err => console.log('? DB ERROR:', err.message));

const Ad = mongoose.model('Ad', new mongoose.Schema({ network: String, code: String }));

app.post('/update-ads', async (req, res) => {
    try {
        await Ad.findOneAndUpdate({ network: 'active' }, req.body, { upsert: true });
        res.json({ success: true });
    } catch (e) { res.status(500).json({ error: e.message }); }
});

app.get('/get-active-ad', async (req, res) => {
    const data = await Ad.findOne({ network: 'active' });
    res.send(data ? data.code : '');
});

app.listen(10000, () => console.log('?? Engine Running on 10000'));
