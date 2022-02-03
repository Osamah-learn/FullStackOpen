const mongoose = require("mongoose");
const argument = process.argv.slice(2);
const [password, name, number] = argument;

const dbConfig = `mongodb+srv://fullstack:${password}@cluster0.bulm2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
/* we put user connection inside variable */

/* We connect to the mongodb server*/
mongoose.connect(dbConfig);
/* We create a new database schema from mongoo*/
const personSchema = new mongoose.Schema({
  name: String,
  number: Number,
});
/* We const Person class model  */
const Person = mongoose.model("Person", personSchema);
/* We create new object from Person class */
const person = new Person({
  name: name,
  number: number,
});

/* we svae the person then we close the connection with mongo */
person.save().then((result) => {
  console.log("Person save!",result);
  mongoose.connection.close();
});
/* WE check data */
Person.find({}).then((result) => {
  result.forEach((person) => {
    console.log(person);
  });
  mongoose.connection.close();
});


