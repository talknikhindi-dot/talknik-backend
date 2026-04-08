const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 10000;

app.use(cors());
app.use(express.json());

// ??????????????? ?????? ???
const URI = "mongodb+srv://talknik_admin:Admin12345@cluster0.svqt5mp.mongodb.net/talknik_db?retryWrites=true&w=majority";

mongoose.connect(URI)
    .then(() => console.log('?? DATABASE CONNECTED! ??'))
    .catch(err => {
        console.error('? MONGODB CONNECTION ERROR:', err.message);
    });

const AdSchema = new mongoose.Schema({ network: String, code: String });
const Ad = mongoose.model('Ad', AdSchema);

app.get('/', (req, res) => res.send('Talknik Engine Active ??'));

app.post('/update-ads', async (req, res) => {
    try {
        const { network, code } = req.body;
        const result = await Ad.findOneAndUpdate({ network: 'active' }, { network, code }, { upsert: true, new: true });
        res.json({ success: true, data: result });
    } catch (e) { 
        console.error('Update Error:', e.message);
        res.status(500).json({ success: false, error: e.message }); 
    }
});

app.get('/get-active-ad', async (req, res) => {
    try {
        const data = await Ad.findOne({ network: 'active' });
        res.send(data ? data.code : 'No Active Ad Found');
    } catch (e) { res.status(500).send('Error fetching data'); }
});

app.listen(PORT, () => console.log('?? Server Running on ' + PORT));
