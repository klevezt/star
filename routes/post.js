const router = require("express").Router();

let Post = require("../models/post.model");

router.route("/all").get((req, res, next) => {
  Post.find()
    .then((post) => {
      if (!post) {
        const error = new Error("Could not find all post.");
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json(post);
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
});

router.route("/:id").get((req, res, next) => {
  Post.findById(req.params.id)
    .then((post) => {
      if (!post) {
        const error = new Error("Could not find user by id.");
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json(post);
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
  const subtitle = req.body.subtitle;
  const slug = req.body.slug;
  const image = req.file ? req.file.filename : "";
  const text = req.body.text;
  const category = req.body.category;
  const tags = req.body.tags ? req.body.tags : [];

  const newPost = new Post({
    title,
    subtitle,
    slug,
    image,
    text,
    category,
    tags,
  });

  newPost
    .save()
    .then((result) => {
      if (!result) {
        const error = new Error("Could not add user.");
        error.statusCode = 404;
        throw error;
      }
      res.status(201).json({ message: "Post successfully added!" });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
});


module.exports = router;
