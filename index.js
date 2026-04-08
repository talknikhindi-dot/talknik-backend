const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const app = express();
const PORT = process.env.PORT || 10000;

app.use(cors());
app.use(express.json());

const MONGO_URI = "mongodb+srv://talknikhindi_db_user:JfdirClPXXXjHyBq@cluster0-shard-00-00.svqt5mp.mongodb.net:27017,cluster0-shard-00-01.svqt5mp.mongodb.net:27017,cluster0-shard-00-02.svqt5mp.mongodb.net:27017/talknik_db?ssl=true&replicaSet=atlas-svqt5mp-shard-0&authSource=admin&retryWrites=true&w=majority";

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});
const User = mongoose.model('User', userSchema);

mongoose.connect(MONGO_URI).then(() => console.log('? DB Connected')).catch(err => console.log(err));

app.get('/', (req, res) => res.send('Talknik Engine is Running!'));

app.listen(PORT, async () => {
    console.log('?? Server running on ' + PORT);
    try {
        const hashedPassword = await bcrypt.hash('TalknikPassword2026', 10);
        await User.findOneAndUpdate(
            { username: 'talknik_boss' },
            { username: 'talknik_boss', password: hashedPassword },
            { upsert: true }
        );
        console.log('? Admin User Synced Successfully!');
    } catch (e) { console.log('? Sync Error: ' + e.message); }
});
