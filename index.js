const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const app = express();
const PORT = process.env.PORT || 10000;
const SECRET = "talknik_secret_key_2026";

app.use(cors());
app.use(express.json());

const MONGO_URI = "mongodb+srv://talknikhindi_db_user:JfdirClPXXXjHyBq@cluster0-shard-00-00.svqt5mp.mongodb.net:27017,cluster0-shard-00-01.svqt5mp.mongodb.net:27017,cluster0-shard-00-02.svqt5mp.mongodb.net:27017/talknik_db?ssl=true&replicaSet=atlas-svqt5mp-shard-0&authSource=admin&retryWrites=true&w=majority";

const User = mongoose.model('User', new mongoose.Schema({ username: String, password: String }));
const AdScript = mongoose.model('AdScript', new mongoose.Schema({ networkName: String, scriptCode: String, isActive: Boolean }));

mongoose.connect(MONGO_URI).then(() => console.log('? DB Connected'));

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username: 'talknik_boss' });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Error' });
    const token = jwt.sign({ id: user._id }, SECRET);
    res.json({ token, message: '? Login Success' });
});

// ????????? ????? ???????? ?????
app.post('/update-ads', async (req, res) => {
    const { network, code } = req.body;
    await AdScript.findOneAndUpdate({ networkName: network }, { scriptCode: code, isActive: true }, { upsert: true });
    res.json({ message: '? Script Synced to All Sites' });
});

// ?????????? ???????? ????????? ?????????? ?????
app.get('/get-active-ad', async (req, res) => {
    const ad = await AdScript.findOne({ isActive: true });
    res.send(ad ? ad.scriptCode : '');
});

app.listen(PORT, async () => {
    console.log('?? Talknik Engine Active on ' + PORT);
});
