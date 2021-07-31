const { Schema, model } = require('mongoose');

const userSchema = Schema({
  identification:{
    type: Number,
    required: true,
    unique: true
  },  
  name: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  date_bird: {
    type: Date,
    required: false
  },
  number_phone: {
    type: Number,
    required: true,
  },
  age:{
    type: Number,
    required: false
  }
});

userSchema.method('toJSON', function () {
  const { __v, _id, ...object } = this.toObject();
  object.uid = _id;
  return object;
});

module.exports = model('Users', userSchema);