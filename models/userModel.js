const mongoose = require("mongoose");
const validator = require("validator");

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },

    middleName: {
      type: String,
    },

    lastName: {
      type: String,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function (value) {
          return validator.isEmail(value); // Make sure to install the "validator" package
        },
        message: "Email must be valid",
      },
    },

    password: {
      type: String,
      required: true,
      validate: {
        validator: function (value) {
          let errorMessages = [];

          //Minimum length of 6 characters
          if (value.length < 6) {
            errorMessages.push("Password must be at least 6 characters long");
          }

          // At least one capital letter
          if (!/[A-Z]/.test(value)) {
            errorMessages.push(
              "Password must contain at least one capital letter"
            );
          }

          // At least one special character
          if (!/[!@#$%^&*]/.test(value)) {
            errorMessages.push(
              "Password must contain at least one special character (!, @, #, $, %, ^, &, *)"
            );
          }

          // At least one number
          if (!/[0-9]/.test(value)) {
            errorMessages.push("Password must contain at least one number");
          }

          if (errorMessages.length > 0) {
            throw new Error(errorMessages.join(", "));
          }

          return true;
        },
        message: "Invalid password",
      },
    },

    phoneNumber: {
      type: String,
      required: true,
      validate: {
        validator: function (value) {
          const phoneNumberRegex = /^[0-9]{10}$/; // Regular expression for 10-digit phone number
          return phoneNumberRegex.test(value);
        },
        message: "Phone number must be a 10-digit number",
      },
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    lastLogin: {
      type: Date,
      default: null,
    },

    resetToken: {
      type: String,
    },
    resetTokenExpiration: {
      type: Date,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("USER", UserSchema);
module.exports = User;
