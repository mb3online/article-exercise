require("dotenv").config();

const mongoose = require("mongoose");

mongoose.connect(
  process.env.MONGO_URL,
  { useNewUrlParser: true }
);

module.exports = mongoose.model(
  "Article",
  new mongoose.Schema({
    title: String,
    author: String,
    image: String,
    content: String,
  })
);
