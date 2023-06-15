const mongoose = require('mongoose');

// Declare the Schema of the Mongo model
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  profilePic:{
    type:Object,
    required:false
}
});

//Export the model
module.exports = mongoose.model('User', userSchema);
