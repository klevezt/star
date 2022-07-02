const router = require("express").Router();

let User = require("../models/user.model");

router.route("/").get((req, res, next) => {
  User.find()
    .then((users) => {
      if (!users) {
        const error = new Error("Could not find users.");
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json(users);
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
});

router.route("/all").get((req, res, next) => {
  User.find()
    .then((users) => {
      if (!users) {
        const error = new Error("Could not find all users.");
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json(users);
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
});

router.route("/:id").get((req, res, next) => {
  User.findById(req.params.id)
    .then((users) => {
      if (!users) {
        const error = new Error("Could not find user by id.");
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json(users);
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
});

router.route("/add").post((req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  const newUser = new User({
    username,
    password,
  });

  newUser
    .save()
    .then((result) => {
      if (!result) {
        const error = new Error("Could not add user.");
        error.statusCode = 404;
        throw error;
      }
      res.status(201).json({ message: "User successfully added!" });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
});

module.exports = router;
