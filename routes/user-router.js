const auth = require("../firebase");
const express = require("express");
const authentication = require("firebase/auth");
const router = express.Router();

/* GET login page. */
router.get("/login", function (req, res, next) {
    res.render("login", { title: "Login" });
});

/* login the user */
router.post("/login", function (req, res, next) {
    // get the request and send it to firebase
    res.render("login", { title: "Submitted" });
});

/* GET signup page. */
router.get("/signup", function (req, res, next) {
    res.render("signup", { title: "Sign up" });
});

/* register the user */
router.post("/signup", function (req, res, next) {
    const { email, password } = req.body;

    try {
        authentication.createUserWithEmailAndPassword(auth, email, password);
    } catch (e) {
        console.error(e);
    }

    res.render("login", { title: "Submitted", message: "Signup success" });
});

module.exports = router;
