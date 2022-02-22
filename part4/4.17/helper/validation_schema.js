const Joi = require('joi');

const authSchema = Joi.object({
  username: Joi.string().min(3).max(30).required(),
  name: Joi.string().min(3).max(30),
  password: Joi.string().min(3).max(30).pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
});


module.exports = {
    authSchema
}