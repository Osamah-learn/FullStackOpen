/* This is the code that connects to the MongoDB database. */
const mongoose = require("mongoose");
/* This is pulling the `MONGODB_URI` from the `config.js` file. */
const config = require("../utils/config");
const dbConfig = config.MONGODB_URI;

/* This code is connecting to the MongoDB database. */
mongoose.connect(dbConfig).then(() => {
  console.log("Starting Mongo");
});

/* This is a way to catch any errors that might come up when connecting to the database. */
mongoose.connection.on("error", (err) =>
  console.log("Connection error", err.message)
);

mongoose.connection.on("disconnect", () => console.log("Connection closed"));
/* This is a way to close the database connection when the user hits `CTRL+C`. */
process.on("SIGINT", async () => {
  await mongoose.connection.close();
  process.exit(0);
});
