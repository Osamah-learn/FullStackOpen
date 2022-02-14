const mostBlogs = require("../utils/for_testing").mostBlog;

describe("array who has more mostBlogs", () => {
  const blogLists = [
    {
      author: "Robert C. Martin",
      blogs: 3,
    },
    {
      author: "Osamah C. Martin",
      blogs: 10,
    },
  ];

  test("when list has only one blog, equals the likes of that", () => {
    const result = mostBlogs(blogLists);
    expect(result.blogs).toBe(10);
  });
});
