const mongoose = require("mongoose");
const bcrypt = require('bcrypt');



const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [ true, "First Name is required"],
    minLength: [ 2, "First Name must be at least 2 characters long"]
  },
  lastName: {
    type: String,
    required: [ true, "Last Name is required"],
    minLength: [ 2, "Last Name must be at least 2 characters long"]
  },
  email: {
    type: String,
    required: [ true, "Email is required"],
    minLength: [ 8, "Email must be at least 8 characters long"],
    validate: {
      validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
      message: "Please enter a valid email"
    }
  },
  password: {
    type: String,
    required: [ true, "Password is required" ],
    minLength: [ 8, "Password must be at least 8 characters long"]
  },
  favoriteWorkouts: {
    type: [String],
    default: []
  }
}, { timestamps: true });

UserSchema.virtual('confirmPassword')
  .get( () => this._confirmPassword )
  .set( value => this._confirmPassword = value );

UserSchema.pre('validate', function(next) {
    if (this.password !== this.confirmPassword) {
      this.invalidate('confirmPassword', 'Password must match confirm password');
    }
    next();
  });

UserSchema.pre('save', function(next) {
  bcrypt.hash(this.password, 10)
    .then(hash => {
      this.password = hash;
      next();
    });
});

const User = mongoose.model("User", UserSchema);
module.exports = User;