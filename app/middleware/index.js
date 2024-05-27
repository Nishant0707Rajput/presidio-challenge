const errorHandler = require('./errorHandler');
const { validate } = require('./requestValidator');
const rateLimiting = require("./rateLimiting");
const auth= require("./auth.js");

module.exports = {
  validate,
  errorHandler,
  rateLimiting,
  ...auth
};
