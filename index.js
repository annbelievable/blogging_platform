const express = require("express");
const auth = require("./firebase");
const path = require("path");

const CommentRouter = require("./routes/comment-router");
const UserRouter = require("./routes/user-router");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/", (req, res, next) => {
    res.send("Hello world");
});
app.use("/comment", CommentRouter);
app.use("/user", UserRouter);

app.listen(3000, () => {
    console.log("Server running on port 3000");
});

module.exports = { app, auth };
