const router = require("express").Router();
const User = require("../models/Users");
const Post = require("../models/Posts");
const Category = require("../models/Category");


router.post("/", async (req, res) => {
    const newCat = new Category(req.body);
    try {
      const savedCat = await newCat.save();
      res.status(200).json(savedCat);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  router.get("/", async (req, res) => {
      try {
        const cats = await Category.find();
        console.log("cats :",cats)
        res.status(200).json(cats);
      } catch (err) {
        res.status(500).json(err);
      }
    });
  
  module.exports = router;


module.exports = router;