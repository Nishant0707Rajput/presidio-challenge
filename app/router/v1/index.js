const app = require('express')();
const { verifyApiKey } = require('../../middleware/auth');
app.use('/user', verifyApiKey ,require('./user/user'));
app.use('/property', verifyApiKey ,require('./property/property'));
app.use('/seller', verifyApiKey ,require('./seller/seller'));
module.exports = app;
