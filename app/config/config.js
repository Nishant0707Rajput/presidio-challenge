const {env} = require("../constant");
const mongoose = require('mongoose');

mongoose.connect(env.MONGO_URI);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Database connected successfully');
});

module.exports = db;
