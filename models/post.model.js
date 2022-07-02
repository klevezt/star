const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
    },
    subtitle: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
    },
    slug: {
      type: String,
      required: false,
    },
    text: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: false,
      default: ""
    },
    tags: {
      type: Array,
      required: false,
      default: []
    }
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
