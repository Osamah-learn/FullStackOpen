const mongoose = require("mongoose");
const blogModel = require("../Models/blogDB");
const supertest = require("supertest");
const app = require("../server");

const api = supertest(app);

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
}, 100000);

test("there are 1 blogs", async () => {
  const response = await api.get("/api/blogs");
  expect(response.body).toHaveLength(1);
});

test("the first blog is about HTTP methods", async () => {
  const response = await api.get("/api/blogs");

  expect(response.body[0].author).toBe("Ahtona");
}, 100000);

test("verifies that the unique identifier property  to be id", async () => {
  const response = await api.get("/api/blogs");

  expect(response.body[0].id).toBeDefined();
}, 100000);

test("verifies that making an HTTP POST request to the /api/blogs url successfully", async () => {
  const response = await api.get("/api/blogs");
  const length = response.body.length;
  await api.post("/api/blogs").send({
    title: "Async wait ",
    author: "Oskuna",
    url: "www.Oskuna.com",
  });
  const newResponse = await api.get("/api/blogs");
  const newlength = newResponse.body.length;
  expect(newlength).toEqual(length + 1);
}, 100000);

test("test that verifies that if the likes property is missing from the request , it will default to the value 0", async () => {
  await api.post("/api/blogs").send({
    title: "like test",
    author: "Oskuna",
    url: "www.Oskuna.com",
  });
  const response = await api.get("/api/blogs");
  const testResponse = response.body.find((blog) => blog.title === "like test");
  expect(testResponse.likes).toBe(0);
}, 100000);

test("title and url properties are missing from the request data, the backend responds 400", async () => {
  await api
    .post("/api/blogs")
    .send({
      author: "Ahtona",
    })
    .expect(400);
});

test("verifies that making an HTTP Delete request to the /api/blogs url successfully", async () => {
  const response = await api.get("/api/blogs");
  const length = response.body.length;
  await api.post("/api/blogs").send({
    title: "Async wait ",
    author: "Oskuna",
    url: "www.Oskuna.com",
  });
  const newResponse = await api.get("/api/blogs");
  const newlength = newResponse.body.length;
  expect(newlength).toEqual(length + 1);
  await api.delete(`/api/blogs/${newResponse.body[0].id}`);
  const newResponse1 = await api.get("/api/blogs");
  const newlength1 = newResponse1.body.length;
  expect(newlength1).toEqual(newlength - 1);
});

test("The application mostly needs to update the amount of likes for a blog post to be 10", async () => {
  await api.post("/api/blogs").send({
    title: "like test",
    author: "Oskuna",
    url: "www.Oskuna.com",
    likes: 5,
  });
  const response = await api.get("/api/blogs");
  const testResponse = response.body.find((blog) => blog.title === "like test");
  expect(testResponse.likes).toBe(5);
  await api.patch(`/api/blogs/${testResponse.id}`).send({
      likes: 10,
    })
    const response1 = await api.get("/api/blogs");
    const testResponse1 = response1.body.find((blog) => blog.id === testResponse.id);
    expect(testResponse1.likes).toEqual(10) 
    
}, 100000);
// update likes to be 10
// read back all blogs
// find again the update one with
//  read back likes and it should be 10

beforeEach(async () => {
  await blogModel.collection.drop();
  await api.post("/api/blogs").send({
    title: "Async wait ",
    author: "Ahtona",
    url: "www.nnjd.com",
  });
});

afterAll(() => {
  mongoose.connection.close();
});
