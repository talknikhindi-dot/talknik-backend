const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://talknikhindi_db_user:JFdirClPXXjHyBq@cluster0.svqt5mp.mongodb.net/talknik_db");
    console.log("✅ MongoDB Atlas Connected!");
  } catch (err) { console.log("❌ DB Connection Error: " + err.message); }
};
module.exports = connectDB;
