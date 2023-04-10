const mongoose = require("mongoose");

var validateEmail = function (email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

const signupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: "Email address is required",
    validate: [validateEmail, "Please fill a valid email address"],
  },
  password: {
    type: String,
    minLength: 6,
    required: true,
  },
  confirmPassword: {
    type: String,
    minLength: 6,
    required: true,
  },
  phone: {
    type: String,
    minLength: 10,
    maxLength: 20,
    pattern: [
      "^(\\([0-9]{3}\\))?[0-9]{3}-[0-9]{4}$",
      "Please enter the valid contact number",
    ],
    required: true,
  },
});

module.exports = mongoose.model("register", signupSchema);
