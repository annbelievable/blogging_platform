const express = require("express");
const cookie = require("cookie");
const jwt = require("jsonwebtoken");
//const firebase = require("firebase");
const authentication = require("firebase/auth");

const auth = require("../firebaseApp");
const { ACCESS_TOKEN_SECRET } = require("../constants");
const router = express.Router();

/* GET login page. */
router.get("/login", function (req, res, next) {
    res.render("login", { title: "Login" });

    //var user = authentication.currentUser;

    auth.onAuthStateChanged((user) => {
        if (user) {
            // User is signed in.
            console.log("Logged in");
        } else {
            // No user is signed in.
            console.log("Not logged in");
        }
    });
});

/* login the user */
router.post("/login", function (req, res, next) {
    const { email, password } = req.body;

    authentication
        .signInWithEmailAndPassword(auth, email, password)
        .then(() => {
            const token = jwt.sign({ email }, ACCESS_TOKEN_SECRET, {
                expiresIn: "1h",
            });

            // Set the token as a cookie in the response
            const cookieOptions = {
                maxAge: 3600000, // Expiration time in milliseconds
                httpOnly: true, // Cookie cannot be accessed via JavaScript
            };
            res.setHeader(
                "Set-Cookie",
                cookie.serialize("token", token, cookieOptions)
            );

            res.render("login", {
                title: "Login",
                message: "Login success",
            });
        })
        .catch((error) => {
            console.error(error);
            res.render("login", { title: "Login", message: "Login fail" });
        });
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

    res.render("login", { title: "Login", message: "Signup success" });
});

module.exports = router;
