const express = require("express");
const router = express.Router();
const User = require("../models/User");
router.post("/register", async (req, res) => { try { const u = new User(req.body); await u.save(); res.status(201).json({ message: "Success!" }); } catch (e) { res.status(400).json({ error: e.message }); } });
router.post("/login", async (req, res) => { const u = await User.findOne(req.body); if (u) res.json({ message: "Login Ok!" }); else res.status(401).json({ error: "Fail!" }); });
module.exports = router;
