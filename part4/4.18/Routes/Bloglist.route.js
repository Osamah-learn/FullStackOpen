/* This is creating a new router object. */
const route = require("express").Router();
const logger = require("../utils/logger");
const Blog = require("../Models/blogDB");
const User = require("../Models/User");

/* Sending a message to the client. */
route.get("/", async (req, res, next) => {
  try {
    /* This is a query to the database. It is looking for all the blogs in the database and then
    populating the user field with the user's information. */
    const blog = await Blog.find({}).populate('user')
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
    /* This is a query to the database. It is looking for the user with the id that is in the body of
    the request. */
    const user = await User.findById(req.body.userId);
    /* This is creating a new blog object and then adding the user's id to the blog object. */
    const insertNewBlog = new Blog({ ...req.body, user: user._id });
    const error = insertNewBlog.validateSync();
    if (!error) {
      /* This is saving the blog to the database. */
      const savedBlog = await insertNewBlog.save();
     /* This is adding the blog id to the user's blogs array. */
      user.blogs = user.blogs.concat(savedBlog._id)
    /* This is saving the user to the database. */
      await user.save()
     /* This is sending the blog that was just saved to the client. */
      res.send(savedBlog);
    } else {
      res.status(400).send();
    }
  } catch (error) {
    logger.info(error.message);
    res.status(500).send(error.message);
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
