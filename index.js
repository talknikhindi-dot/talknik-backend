const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// ????? ?????????? ??????? ????????
const URI = "mongodb+srv://talknik_admin:Admin12345@cluster0.svqt5mp.mongodb.net/talknik_db?retryWrites=true&w=majority";

mongoose.connect(URI)
    .then(() => console.log('? DATABASE CONNECTED!'))
    .catch(err => console.log('? DB CONNECTION ERROR:', err.message));

const AdSchema = new mongoose.Schema({ network: String, code: String });
const Ad = mongoose.model('Ad', AdSchema);

app.get('/', (req, res) => res.send('Talknik Engine is Active ??'));

app.post('/update-ads', async (req, res) => {
    try {
        // 'active' ?? ??-?????? ??????? ????? ???
        await Ad.findOneAndUpdate({ network: 'active' }, req.body, { upsert: true });
        res.json({ success: true, message: 'Updated Successfully' });
    } catch (e) {
        res.status(500).json({ success: false, error: e.message });
    }
});

app.get('/get-active-ad', async (req, res) => {
    const data = await Ad.findOne({ network: 'active' });
    res.send(data ? data.code : '');
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log('?? Engine Live on ' + PORT));
