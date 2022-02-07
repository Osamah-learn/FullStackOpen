const mongoose = require('mongoose')
/* Put SENSITIVE DATA INSIDE CONFIG LIBRARY */
const config = require('config')
/* we define db config to import config file */
const dbConfig = config.get('env.dbConfig.dbName')
console.log('connecting to', dbConfig)
/* we put user connection inside variable */

/* We connect to the mongodb server*/
mongoose
  .connect(dbConfig)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })
/* We create a new database schema from mongoo*/
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
  },
  number: String,
})
/* Delete _id returned from mongo */
personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    /* Change _id to id */
    returnedObject.id = returnedObject._id
    /* then we delete _id also __v */
    delete returnedObject._id
    delete returnedObject.__v
  },
})
/* We const Person class model  */
const Person = mongoose.model('Person', personSchema)

/* Export Data */

module.exports = Person
