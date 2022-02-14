/* This is creating a new router object. */
const route = require("express").Router();
const logger = require("../utils/logger");
const Blog = require("../Models/blogDB");
console.log(Blog.find());
/* Sending a message to the client. */
route.get("/", async (req, res, next) => {
  try {
    const blog = await Blog.find({});
    res.json(blog);
  } catch (error) {
    next(error);
  }
});
route.get("/:id", (req, res, next) => {
  res.send("getting asingle blog");
});
route.post("/", async (req, res, next) => {
  try {
    const insertNewBlog = new Blog(req.body);
    const error = insertNewBlog.validateSync();
    if (!error) {
      const savedBlog = await insertNewBlog.save();
      res.send(savedBlog);
    } else {
      res.status(400).send();
    }
  } catch (error) {
    logger.info(error.message);
  }
});
route.patch("/:id", async (req, res, next) => {
 const deletedBlog = await Blog.findByIdAndUpdate(req.params.id, {
    title: req.body.title,
    author: req.body.author,
    url: req.body.url,
    likes: req.body.likes,
  });
  res.send(deletedBlog);
});

route.delete("/:id", async (req, res, next) => {
  // Delete the document by its _id
  await Blog.deleteOne({ id: `${req.params.id}` });
  res.send(" blog deleted");
});

module.exports = route;
