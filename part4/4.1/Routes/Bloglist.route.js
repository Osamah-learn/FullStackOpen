/* This is creating a new router object. */
const route = require("express").Router();
const Proudect = require("../Models/blogDB");
const logger = require("../utils/logger");
 const Blog = require("../Models/blogDB")
console.log(Blog.find())
/* Sending a message to the client. */
route.get("/", async(req, res, next) => {
  try {
    const blog = await Blog.find({})
    res.json(blog)
  } catch (error) {
    next(error)
  }
});
route.get("/:id", (req, res, next) => {
  res.send("getting asingle blog");
});
route.post("/", async (req, res, next) => {
  try {
    const insertNewProudect = new Proudect(req.body);
    const savedBlog = await insertNewProudect.save();
    res.send(savedBlog);
  } catch (error) {
    logger.info(error.message);
  }
});
route.patch("/:id", (req, res, next) => {
  res.send("blog update");
});

route.delete("/:id", (req, res, next) => {
  res.send(" blog deleted");
});

module.exports = route;
