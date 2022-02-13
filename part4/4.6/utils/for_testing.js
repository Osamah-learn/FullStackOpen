/* This is a way to import lodash into your code. It is a way to make sure that you are using the
latest version of lodash. */
const _ = require("lodash");

/**
 * Given a string, return the string with the characters in reverse order
 * @param string - The string to check.
 * @returns Nothing.
 */
const palindrome = (string) => {
  return string.split("").reverse().join("");
};

/**
 * Given an array, return the average of the numbers in the array
 * @param array - The array to be averaged.
 * @returns The average of the array.
 */
const average = (array) => {
  const reducer = (sum, item) => {
    return sum + item;
  };
  return array.length === 0 ? 0 : array.reduce(reducer, 0) / array.length;
};

/**
 * It returns 1.
 * @param blogs - an array of blogs
 * @returns 1
 */
const dummy = (blogs) => {
  return 1;
};

/**
 * Given a list of blogs, return the total number of likes for all the blogs
 * @param blogs - an array of blogs
 * @returns The total number of likes for all blogs.
 */
const totalLikes = (blogs) => {
  return blogs.reduce(function (sum, blog) {
    return sum + blog.likes;
  }, 0);
};

/**
 * Find the blog with the most likes in an array of blogs
 * @param blogs - an array of objects
 * @returns The object with the highest number of likes.
 */
const biggestSumObj = (blogs) => {
  return blogs.reduce((total, current) => {
    if (current.likes > total.likes) {
      return current.likes;
    }
    total;
  });
};

/**
 * Find the blog with the most likes
 * @param blogs - an array of blog objects.
 * @returns The blog with the most likes.
 */
const favoriteBlog = (blogs) => {
  return blogs.reduce((total, current) => {
    if (current.likes > total.likes) {
      return current;
    }
    total;
  });
};

/**
 * Find the maximum number of blogs by a single user
 * @param maxBlog - The array of objects that we want to find the most blogs from.
 * @returns The most blog is being returned.
 */
const mostBlog = (maxBlog) => {
  const maxValiue = _.maxBy(maxBlog, function (maxvalue) {
    return maxvalue.blogs;
  });
  return maxValiue;
};


const mostBlogsLike = (maxBlog) => {
  const maxValiue = _.maxBy(maxBlog, function (maxvalue) {
    return maxvalue;
  });
  return maxValiue;
};
/* Exporting the functions to the global scope. */
module.exports = {
  palindrome,
  average,
  dummy,
  totalLikes,
  biggestSumObj,
  favoriteBlog,
  mostBlog,
  mostBlogsLike
};
