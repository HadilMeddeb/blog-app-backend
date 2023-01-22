const router = require("express").Router();
const User = require("../models/Users");
const bcrypt = require("bcrypt");
//registration

router.post("/register", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPass,
    });
    console.log("newUser", newUser);
    const user = await newUser.save();
    res.status(200).json(user); //user has been creataed successfuly
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    console.log("hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh")
    const user = await User.findOne({ username: req.body.username });
    console.log("user :",user)
    if(!user){ 
      res.status(500).json({message:"Wrong credentials!"})}
   else {
    const validated = await bcrypt.compare(req.body.password, user.password);
      if(!validated)
     {
      !validated && res.status(500).json(({message:"Wrong credentials!"}));
     }
   else
   {
    const { password, ...others } = user._doc;
    res.status(200).json(user);
   }
   }

    
  } catch (err) {
    console.logg("4444444444444444444")
    res.status(500).json(JSON.stringify(err.message));
  }
});

module.exports = router;
