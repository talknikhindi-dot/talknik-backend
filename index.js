const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
const MONGO_URI = 'mongodb+srv://sumit:' + 'तुमचा_MongoDB_पासवर्ड_इथे_टाका' + '@cluster0.mongodb.net/talknik_db?retryWrites=true&w=majority';

mongoose.connect(MONGO_URI)
  .then(() => console.log('Talknik IT Database Connected Successfully!'))
  .catch(err => console.log('Database Connection Failed: ', err));

// Ad Links
const adLinks = [
    'https://your-monetag-link.com',
    'https://your-adsterra-link.com',
    'https://your-hilltopads-link.com'
];

app.get('/', (req, res) => {
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.send('Talknik IT API: MongoDB आणि Ad Rotator आता चालू झाले आहेत!');
});

app.get('/get-ad', (req, res) => {
    const randomAd = adLinks[Math.floor(Math.random() * adLinks.length)];
    res.json({ adUrl: randomAd });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log('Server is live on port ' + PORT));
