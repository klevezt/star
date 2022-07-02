const router = require("express").Router();
const bcrypt = require("bcrypt");
let Users = require("../models/user.model");

require("dotenv").config();

// Log in
router.route("/login").post(async (req, res) => {
  const { username, password } = req.body;

  // Look for user email in the database
  const user = await Users.findOne({ username });

  // If user not found, send error message
  if (!user) {
    return res.status(400).json({
      error: {
        msg: "Invalid credentials",
      },
    });
  }

  // Compare hased password with user password to see if they are valid
  let isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(401).json({
      error: {
        msg: "Email or password is invalid",
      },
    });
  }

  res.status(200).json({ user });
});

module.exports = router;