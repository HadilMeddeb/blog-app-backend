//créer notre express server
const express = require("express");
var cors = require('cors')
//créer notre application
const app = express();
app.use(cors())
//le port pour l'exécution de l'applcation
//app.use("/soa",(req,res)=>{
  //  console.log("hey this our soa project")
//})
const multer = require("multer");
const path = require("path");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const categoryRoute = require("./routes/categories");

dotenv.config();
app.use(express.json());//pour qu'on puisse envoyer un objet json 
app.use("/images",express.static(path.join(__dirname,"/images")))
console.log(path.join(__dirname,"/images"))
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "images");
    },
    filename: (req, file, cb) => {
      cb(null, req.body.name);
    },
  });
  
  const upload = multer({ storage: storage });
  app.post("/api/upload", upload.single("file"),(req, res) => {
    res.status(200).json("File has been uploaded");
  });
  

app.use("/api/auth",authRoute);
app.use("/api/users",userRoute);
app.use("/api/posts",postRoute);
app.use("/api/categories",categoryRoute);
app.listen("3000",()=> {
    console.log("ceci est le backend de l'application on port ", 3000);
})