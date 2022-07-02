const router = require("express").Router();

let Category = require("../models/category.model");

router.route("/all").get((req, res, next) => {
  Category.find()
    .then((category) => {
      if (!category) {
        const error = new Error("Could not find all category.");
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json(category);
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
});

router.route("/:id").get((req, res, next) => {
  Category.findById(req.params.id)
    .then((category) => {
      if (!category) {
        const error = new Error("Could not find user by id.");
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json(category);
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
});

router.route("/add").post((req, res, next) => {
  const title = req.body.title;
  const slug = req.body.slug;

  const newCategory = new Category({
    title,
    slug,
  });

  newCategory
    .save()
    .then((result) => {
      if (!result) {
        const error = new Error("Could not add user.");
        error.statusCode = 404;
        throw error;
      }
      res.status(201).json({ message: "Category successfully added!" });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
});

module.exports = router;
