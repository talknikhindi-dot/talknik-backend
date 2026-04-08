const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 10000;

app.use(cors());
app.use(express.json());

const MONGO_URI = "mongodb+srv://talknikhindi_db_user:JfdirClPXXXjHyBq@cluster0.svqt5mp.mongodb.net/talknik_db?retryWrites=true&w=majority";

const AdSchema = new mongoose.Schema({ network: String, code: String });
const Ad = mongoose.model('Ad', AdSchema);

mongoose.connect(MONGO_URI).then(() => console.log('? DB Connected')).catch(err => console.log('? Error:', err));

app.get('/', (req, res) => res.send('Talknik Engine Active ??'));

app.post('/update-ads', async (req, res) => {
    try {
        const { network, code } = req.body;
        await Ad.findOneAndUpdate({ network: 'active' }, { network, code }, { upsert: true });
        res.json({ message: '? Ad Updated' });
    } catch (e) { res.status(500).send(e.message); }
});

app.get('/get-active-ad', async (req, res) => {
    try {
        const data = await Ad.findOne({ network: 'active' });
        res.send(data ? data.code : 'No Ads');
    } catch (e) { res.send(''); }
});

app.listen(PORT, () => console.log('?? Server running'));
