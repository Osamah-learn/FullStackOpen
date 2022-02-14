const mostBlogsLikes = require("../utils/for_testing").mostBlog;

describe("Blog author who has more Likes", () => {
  const blogLists = [
    {
      author: "Edsger W. Dijkstra",
      likes: 10,
    },
    {
      author: "Osamah Amer",
      blogs: 17,
    },
  ];

  test("when list has only one blog, equals the likes of that", () => {
    const result = mostBlogsLikes(blogLists);
    expect(result.blogs).toBe(17);
  });
});
