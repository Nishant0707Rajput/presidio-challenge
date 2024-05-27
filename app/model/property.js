const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
    name: { type: String, required: true },
    distance: { type: Number }
  });
  
  const propertySchema = new mongoose.Schema({
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    name: { type: String, required: true },
    propertyIdentificationCode:{ type: String, required: true },
    place: { type: String, required: true },
    area: { type: String, required: true },
    bedrooms: { type: Number, required: true },
    bathrooms: { type: Number, required: true },
    hospitalsNearby: locationSchema,
    collegesNearby: locationSchema,
  });

const Property = mongoose.model('Property', propertySchema);

module.exports = Property;
