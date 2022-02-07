const mongoose = require('mongoose')
/* Put SENSITIVE DATA INSIDE CONFIG LIBRARY */
const config = require('config')
/* we define db config to import config file */
const dbConfig = config.get('env.dbConfig.dbName')

/* we put user connection inside variable */

/* We connect to the mongodb server*/
mongoose.connect(dbConfig)
/* We create a new database schema from mongoo*/
const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})
/* We const Person class model  */
const Person = mongoose.model('Person', personSchema)
/* We create new object from Person class */
const person = new Person({
  name: 'Osamah',
  number: '987732133213',
})

/* we svae the person then we close the connection with mongo */
person.save().then(() => {
  console.log('Person save!')
  mongoose.connection.close()
})
/* WE check data */
Person.find({}).then((result) => {
  result.forEach((person) => {
    console.log(person)
  })
  mongoose.connection.close()
})


