const favoriteBlog = require('../utils/for_testing').favoriteBlog

describe("sum of likes", () => {
  const listWithOneBlog = [
    {
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 12,
    },
  ];

  test("when list has only one blog, equals the likes of that", () => {
    const result = favoriteBlog(listWithOneBlog);
    expect(result.likes).toBe(12);
  });
});
