const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dns = require("dns");

dns.setDefaultResultOrder("ipv4first");
const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb+srv://talknikhindi_db_user:JFdirClPXXjHyBq@cluster0.svqt5mp.mongodb.net/talknik_db")
    .then(() => console.log("✅ MongoDB Atlas Connected!"))
    .catch(err => console.log("❌ DB Error: " + err.message));

const User = mongoose.model("User", new mongoose.Schema({ username: String, password: String }));

app.post("/api/auth/register", async (req, res) => {
    try { const u = new User(req.body); await u.save(); res.status(201).json({ message: "Success!" }); }
    catch (e) { res.status(400).json({ error: e.message }); }
});

app.post("/api/auth/login", async (req, res) => {
    const u = await User.findOne(req.body);
    if (u) res.json({ message: "Login Successful!" });
    else res.status(401).json({ error: "Invalid Credentials" });
});

const PORT = 9000;
app.listen(PORT, () => console.log(`🚀 Server LIVE on http://localhost:${PORT}`));
