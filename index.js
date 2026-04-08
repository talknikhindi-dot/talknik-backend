const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 10000;

app.use(cors());
app.use(express.json());

// ????? ?????? ???????? URI
const URI = "mongodb+srv://talknik_admin:Admin12345@cluster0.svqt5mp.mongodb.net/talknik_db?retryWrites=true&w=majority";

mongoose.connect(URI)
    .then(() => console.log('?? DATABASE CONNECTED SUCCESSFULLY! ??'))
    .catch(err => console.error('? AUTH ERROR:', err.message));

const AdSchema = new mongoose.Schema({ network: String, code: String });
const Ad = mongoose.model('Ad', AdSchema);

app.get('/', (req, res) => res.send('Talknik Engine Active ??'));

app.post('/update-ads', async (req, res) => {
    try {
        const { network, code } = req.body;
        await Ad.findOneAndUpdate({ network: 'active' }, { network, code }, { upsert: true });
        res.json({ success: true, message: 'Updated' });
    } catch (e) { res.status(500).json({ success: false, error: e.message }); }
});

app.get('/get-active-ad', async (req, res) => {
    try {
        const data = await Ad.findOne({ network: 'active' });
        res.send(data ? data.code : '');
    } catch (e) { res.send(''); }
});

app.listen(PORT, () => console.log('?? Engine Running'));
