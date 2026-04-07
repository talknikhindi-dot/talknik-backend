import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const PORT = 8080;

// Sharded Connection String - ?? ???????????? DNS ?? ?????? ????
const uri = "mongodb://talknikhindi_db_user:JFdirClPXKXjHyBq@cluster0-shard-00-00.svqt5mp.mongodb.net:27017,cluster0-shard-00-01.svqt5mp.mongodb.net:27017,cluster0-shard-00-02.svqt5mp.mongodb.net:27017/talknik_db?ssl=true&replicaSet=atlas-svqt5mp-shard-0&authSource=admin&retryWrites=true&w=majority";

console.log('? Connecting via Direct Path...');

mongoose.connect(uri)
.then(() => {
    console.log('------------------------------------------');
    console.log('? ????? ????! ??? ???% ??????? ???? ???!');
    console.log('------------------------------------------');
})
.catch((err) => {
    console.error('? ?????? ???????? ???? ???:', err.message);
});

app.get('/', (req, res) => res.send('Talknik Project is Live!'));
app.listen(PORT, () => console.log('?? Server is running on port 8080'));
