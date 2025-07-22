const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchem = new Schema({
  name: { type: String, required: true },
  username: { type: String, required: true },
  email: { type: String, required: true, match: /.+\@.+\..+/ },
  address: {
    street: { type: String },
    suite: { type: String },
    city: { type: String },
    zipcode: { type: String },
    geo: {
      lat: { type: String },
      lng: { type: String },
    },
  },
  phone: { type: String },
  website: { type: String },
  company: {
    name: { type: String },
    catchPhrase: { type: String },
    bs: { type: String },
  },
});

module.exports = mongoose.model("User", userSchem, "User");
