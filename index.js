const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv").config();
const multer = require("multer");

const auth = require("./firebaseApp");
const BlogRouter = require("./routes/blog-router");
const CommentRouter = require("./routes/comment-router");
const UserRouter = require("./routes/user-router");

const app = express();
const upload = multer();

//app.use(express.urlencoded({ extended: false }));
//app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/", (req, res, next) => {
    res.send("Hello world");
});
app.use("/blog", BlogRouter);
app.use("/comment", CommentRouter);
app.use("/user", UserRouter);

app.listen(3000, () => {
    console.log("Server running on port 3000");
});

module.exports = { app, auth };
