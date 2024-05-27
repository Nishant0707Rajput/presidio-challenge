const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true
  },
  token: {
    type: String,
    required: true,
    unique: true
  },
});

const Session = mongoose.model('Session', sessionSchema);

module.exports = Session;
