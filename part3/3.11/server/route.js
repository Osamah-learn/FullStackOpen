const express = require("express");
const app = express();
const { json } = require("express");
const route = express.Router();
const persons = require("./database");
const Joi = require("joi");


/* Validate function */
const validateFunction = (person) => {
  const schema = {
    name: Joi.string().min(3).max(30).required(),
    number: Joi.string().min(9).max(30).required(),
  };

  return Joi.validate(person, schema);
};

/* Http Request  */
/*  */


route.get("/info", (req, res) => {
  const personSize = Object.keys(persons).length;
  res.send(`Phonebook has info for  ${personSize} people <br/> ${new Date()}`);
});
/* Response for all persons */
route.get("/persons", (req, res) => {
  res.send(persons);
});

/* Response for single person */
route.get("/persons/:id", (req, res) => {
  const person = persons.find((c) => c.id === parseInt(req.params.id));
  if (!person)
    res
      .status(404)
      .send(`could not find this person with given id please try again...`);
  res.send(person);
});

/* Post new person to persons */
route.post("/persons", (req, res) => {
  const schema = {
    name: Joi.string().exist().alphanum().min(3).max(30).required(),
    number: Joi.string().min(9).max(30).required(),
  };
  const { body } = req;
  const { error } = validateFunction(body, schema);
  console.log("body", req.body);
  const result = persons.filter(({ name }) => name === body.name);
  if (error) return res.status(400).send(error.details[0].message);
  else if (result.length > 0)
    return res.status(409).send(`${body.name} is already exist`);
  else {
    const person = {
      id: persons.length + 1,
      name: req.body.name,
      number: req.body.number,
    };

    persons.concat(person);
    res.send(person);
  }
});
/* Response for updating */
route.put("/persons/:id", (req, res) => {
  // take the person name if it not found we return 404 else we continuo
  const person = persons.find((c) => c.id === parseInt(req.params.id));
  if (!person)
    return res.status(404).send(
      `<h1>
            "404
            <br />
            could not find this person with given id please try again...
          </h1>`
    );

  // init validation
  const { body } = req;
  const { error } = validateFunction(body);
  // if invalid return 400 - bad request
  if (error) return res.status(400).send(error.details[0].message);

  // other wise update
  person.name = body.name;
  person.number = body.number;
  // return the updated person
  res.send(person);
});
/* We bulid delete response */
route.delete("/persons/:id", (req, res) => {
  // lookup to the person
  const person = persons.find(
    (person) => person.id === parseInt(req.params.id)
  );
  if (!person)
    return res
      .status(404)
      .send(" could not find this person with given id please try again...");
  // Delete the person
  index = persons.indexOf(person);
  persons.splice(index, 1);
  res.send(person);
});

module.exports = route;
