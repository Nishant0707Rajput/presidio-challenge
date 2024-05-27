const Joi = require('joi');

const userDetail = Joi.object({
  firstName: Joi.string().min(3).max(30).required(),
  lastName: Joi.string().min(3).max(30).required(),
  email: Joi.string().min(3).max(50).required(),
  phone: Joi.string().min(8).max(20).required(),
  userType: Joi.string().min(3).max(50).required(),
  password: Joi.string().min(6).max(50).required(),
});

const loginDetail = Joi.object({
  email: Joi.string().email().min(3).max(50).required(),
  password: Joi.string().min(6).max(50).required(),
});

module.exports = {
  userDetail,
  loginDetail
};
