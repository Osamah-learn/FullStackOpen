/* The first line imports the mongoose module. 
The second line imports the config file. 
The third line creates a variable called dbConfig and assigns it the value of the MONGODB_URI key */
const mongoose = require("mongoose");
const config = require("../utils/config");
const dbConfig = config.MONGODB_URI;

/* This code is connecting to the MongoDB database. */
mongoose.connect(dbConfig).then(() => {
  console.log("Starting Mongo");
});

/* Create a new mongoose schema.

The schema has four fields: title, author, url, and likes.

The schema is stored in a variable named blogSchema. */
const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
});

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
