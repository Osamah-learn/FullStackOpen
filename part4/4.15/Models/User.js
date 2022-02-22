/* This is importing the mongoose module. */
const mongoose = require("mongoose");

const bcrypt = require("bcrypt");

/* This is creating a new schema for the User model. */
const userSchema = new mongoose.Schema({
  username: { type: "string", required: true, lowercase: true, unique: true },
  name: { type: "string", required: true, unique: true },
  password: { type: "string", required: true},
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog",
    },
  ],
});

/* This is a method that is called before the user is saved to the database. */
userSchema.pre("save", async function async (next) {
  try {
    /* This is creating a salt and hashing the password. */
     const salt = await bcrypt.genSalt(10);
     const hashedPassword = await bcrypt.hash(this.password,salt);
     this.password = hashedPassword
     next();
  } catch (error) {
    next(error);
  }
});

/* This is a method that is called when the user is converted to JSON. */
userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    // the passwordHash should not be revealed
    delete returnedObject.password;
  },
});

/* This is creating a new model that is based on the userSchema. */
const User = mongoose.model("User", userSchema);

/* This is creating a new model that is based on the userSchema. */
module.exports = User;
