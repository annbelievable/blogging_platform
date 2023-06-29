import { initializeApp } from "firebase/app";

const express = require("express");
const app = express();
const CommentRouter = require("./routes/comment-router");

const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: "",
};

initializeApp(firebaseConfig);

app.set("view engine", "ejs");

app.use("/comment", CommentRouter);
