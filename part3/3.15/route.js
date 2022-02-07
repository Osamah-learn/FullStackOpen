const express = require('express')
const route = express.Router()
const Person = require('./db/dataBase')
const { validationSchema } = require('./db/validationSchema')
//const schema = require("./db/validationSchema");

/* Http Request  */
/*  */

route.get('/info', async (req, res) => {
  const personSize = await Person.countDocuments()
  res.send(`Phonebook has info for  ${personSize} people <br/> ${new Date()}`)
})
/* Response for all persons */
route.get('/persons', async (req, res, next) => {
  try {
    const persons = await Person.find({})
    res.json(persons)
  } catch (error) {
    next(error)
  }
})

route.post('/persons', async (req, res, next) => {
  const { error } = validationSchema(req.body)
  if (error) {
    console.log(error)
    return res.status(400).send(error.details[0].message)
  } else {
    console.log('Data sucsess pass Joi validation')
    const body = req.body

    const person = new Person({
      name: body.name,
      number: body.number,
    })
    try {
      const saved_person = await person.save()
      res.json(saved_person)
    } catch (error) {
      console.log('Ahtona', error)
      if (error.code === 11000) {
        return res.status(409).send('Bad request')
      } else {
        next(error)
      }
    }
  }
})
/* Response for single person */
route.get('/persons/:id', async (req, res, next) => {
  try {
    const person = await Person.findById(req.params.id).exec()
    if (!person)
      return res
        .status(404)
        .send('could not find this person with given id please try again...')
    res.send(person)
  } catch (error) {
    next(error)
  }
})

/* Post new person to persons */

/* Response for updating */
route.put('/persons/:id', async (req, res, next) => {
  try {
    const person = await Person.findById(req.params.id).exec()
    if (!person)
      return res.status(404).send(
        `<h1>
            "404
            <br />
            could not find this person with given id please try again...
          </h1>`
      )

    // init validation
    const { body } = req
    const { error } = validationSchema(body)
    // if invalid return 400 - bad request
    if (error) return res.status(400).send(error.details[0].message)

    // other wise update
    person.name = body.name
    person.number = body.number
    // return the updated person
    await person.save()
    res.send(person)
  } catch (error) {
    next(error)
  }
  // take the person name if it not found we return 404 else we continuo
})
/* We bulid delete response */
route.delete('/persons/:id', async (req, res, next) => {
  try {
    // lookup to the person
    const person = await Person.findByIdAndDelete(req.params.id).exec()
    if (!person)
      return res
        .status(404)
        .send(' could not find this person with given id please try again...')

    res.send(`The ${req.params.id} succsuffly  deleted`)
  } catch (error) {
    next(error)
  }
})

module.exports = route
