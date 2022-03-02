const supertest = require("supertest");
const User = require("../Models/User");
const helper = require("./test_helper");
const app = require("../server");
const api = supertest(app);

/* This is a test helper function. It is used to clean up the database before each test. */
describe("when there is initially one user in db", () => {
  beforeEach(async () => {
    await User.deleteMany({});
    const user = new User({
      username: "root",
      name: "Osamah",
      password: "password",
    });

    await user.save();
  }, 10000);

  /* The above code is creating a new user in the database. */

  test("creation succeeds with a fresh username", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "eqweqweqwe.iq",
      name: "2321312",
      password: "sdadasdasd",
    };

    await api
      .post("/api/register")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

    const usernames = usersAtEnd.map((u) => u.username);
    expect(usernames).toContain(newUser.username);
  }, 10000);
});
