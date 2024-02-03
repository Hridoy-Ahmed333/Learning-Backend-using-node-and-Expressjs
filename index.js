require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const server = express();
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const productRouter = require("./routes/product");
const userRouter = require("./routes/user");
const authRouter = require("./routes/auth");
//MongoDB connection
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/ecommerce");
  console.log("Connected with database");
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
//Schema

//Middleware
//When making middle ware always use "server.use()"
const auth = (req, res, next) => {
  const token = req.get("Authorization")?.split("Bearer ")[1];
  console.log(token);
  try {
    var decoded = jwt.verify(token, "shhhhh");
    console.log(decoded);
    if (decoded.email) {
      next();
    } else {
      res.sendStatus(401);
    }
  } catch {
    res.sendStatus(401);
  }
};
server.use(cors());
server.use(express.json()); //Use this middle ware to read body in json format
//server.use(express.urlencoded());
server.use(morgan("combined"));
server.use(express.static("public"));
server.use("/auth", authRouter.router);
server.use("/products", auth, productRouter.router);
server.use("/users", auth, userRouter.router);
//Creating Rest APIs

server.listen(8080, () => {
  console.log("Server started");
});
