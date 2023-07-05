var path = require("path");
const express = require("express");
const { initializeApp } = require("firebase/app");
const { getFirestore } = require("firebase/firestore");
const { getAnalytics, isSupported } = require("firebase/analytics");

const CommentRouter = require("./routes/comment-router");
const UserRouter = require("./routes/user-router");

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAyZdtgqht6NgcWFiLmGsv5RnCOrXH-2PY",
    authDomain: "blogging-platform-c87fd.firebaseapp.com",
    projectId: "blogging-platform-c87fd",
    storageBucket: "blogging-platform-c87fd.appspot.com",
    messagingSenderId: "1061757806361",
    appId: "1:1061757806361:web:13cea5efe21dd4f4318788",
    measurementId: "G-6W4RTHJ2S5",
};

// Initialize Firebase
const fbApp = initializeApp(firebaseConfig);
const db = getFirestore(fbApp);
let analytics = null;

if (isSupported()) {
    //analytics = getAnalytics(fbApp);
}

const app = express();

app.use(express.json());

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

module.exports = app;
