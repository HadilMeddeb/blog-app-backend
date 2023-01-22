const router = require("express").Router();
const User = require("../models/Users");
const Post = require("../models/Posts");

//CREATE POST
router.post("/", async (req, res) => {
  const newPost = new Post(req.body);
  console.log("categories : ", req.body.categories);
  try {
    console.log("req.body");
    console.log("**************************1");
    const savedPost = await newPost.save();
    console.log("**************************2");
    res.status(200).json(savedPost);
  } catch (err) {
    console.log("err :", err);
    res.status(500).json(JSON.stringify(err.message));
  }
});

//UPDATE POST
router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    console.log("post :", post);
    console.log(post.user_id === req.body.user_id);
    console.log(post.username);
    console.log(req.body.desc, "--", req.body.title);
    if (post.user_id == req.body.user_id) {
      try {
        const updatedPost = await Post.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        console.log(updatedPost);
        res.status(200).json(updatedPost);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can update only your post!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE POST
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    console.log(post.username);
    if (post.user_id == req.body.user_id) {
      try {
        await post.delete();
        res.status(200).json("Post has been deleted...");
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can delete only your post!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET POST
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL POSTS
router.get("/", async (req, res) => {
  const username = req.query.user;
  const catName = req.query.cat;

  console.log("req.query.user :", req.query.user);
  try {

      posts = await Post.find().populate("categories");
      console.log("posts :", posts);
    
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

// posts by user
router.get("/user/:user_id", async (req, res) => {
  const user_id = req.params.user_id;
  try {
    let posts;
    posts = await Post.find({ user_id: user_id }).populate("categories");
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

// posts by category
router.get("/category/:category_id", async (req, res) => {
  const catName = req.params.category_id;
  try {
    posts = await Post.find({
      categories: {
        $in: [catName],
      },
    }).populate("categories");
    console.log("category post =", posts)
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
