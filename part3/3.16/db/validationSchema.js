const Joi = require('joi')

/* Input validation */

const validationSchema = (value) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(30).required(),

    number: Joi.string().min(8).pattern(/^[0-9]{2,3}-[0-9]+$/).required(),
  })

  return schema.validate(value)
}


module.exports.validationSchema = validationSchema