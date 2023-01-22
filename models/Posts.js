const mongoose = require("mongoose");
const Category = require("./Category");

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    desc: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      required: false,
    },
    username: {
      type: String,
      required: true,
    },
    user_id:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    categories: [{
      type: mongoose.Schema.Types.ObjectId,
      ref:'Category'
    }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);