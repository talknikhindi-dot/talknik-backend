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

const User = mongoose.model('User', new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
}));

mongoose.connect(MONGO_URI).then(() => console.log('? DB Connected')).catch(err => console.log(err));

// Login Route
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: 'User Not Found' });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid Password' });
    const token = jwt.sign({ id: user._id }, SECRET, { expiresIn: '1h' });
    res.json({ token, message: '? Login Successful' });
});

app.listen(PORT, async () => {
    console.log('?? Server running on ' + PORT);
    try {
        const hashedPassword = await bcrypt.hash('TalknikPassword2026', 10);
        await User.findOneAndUpdate({ username: 'talknik_boss' }, { username: 'talknik_boss', password: hashedPassword }, { upsert: true });
        console.log('? Admin Sync Done!');
    } catch (e) { console.log('? Sync Error: ' + e.message); }
});
