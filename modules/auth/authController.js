const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../../models/userModel");
const { generateAccessToken } = require("../../utils/jwt");

exports.register = async (req, res) => {
  try {
    const {
      firstName,
      middleName,
      lastName,
      email,
      phoneNumber,
      password,
      role,
    } = req.body;
    if (
      !firstName ||
      !lastName ||
      !email ||
      !phoneNumber ||
      !password ||
      !role
    ) {
      return res
        .status(422)
        .json({ message: `Please fill the required details!` });
    }

    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(422).json({ message: `User already exist` });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const user = new User({
      firstName,
      middleName,
      lastName,
      email,
      password: hashPassword,
      phoneNumber,
      role,
    });

    const savedUser = await user.save();
    if (savedUser) {
      return res.status(200).json({ message: `User saved successfully!` });
    } else if (err) {
      throw err;
    }
  } catch (error) {
    console.error("Error in register:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(422)
        .json({ message: `Please fill the required details!` });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: `Invalid email or password` });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: `Invalid email or password` });
    }

    const token = generateAccessToken(email);
    res.cookie("jwt_token", token, {
      expires: new Date(Date.now() + 25892000000),
      httpOnly: true,
    });
    user.lastLogin = new Date();
    await user.save();
    return res
      .status(200)
      .json({ message: "User logged in successfully", token });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
};
