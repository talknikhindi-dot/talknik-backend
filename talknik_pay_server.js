const express = require('express');
const path = require('path');
const app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => { res.sendFile(path.join(__dirname, 'public', 'talknik_pay.html')); });
app.listen(5000, () => console.log('🚀 Talknik Premium Gateway Live: http://localhost:5000'));
