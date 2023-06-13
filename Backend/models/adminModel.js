const mongoose = require('mongoose');

// Declare the Schema of the Mongo model
const adminSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

//Export the model
module.exports = mongoose.model('Admin', adminSchema);
