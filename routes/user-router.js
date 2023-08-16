const express = require("express");
const jwt = require("jsonwebtoken");
const authentication = require("firebase/auth");

const auth = require("../firebaseApp");
const router = express.Router();

/* GET login page. */
router.get("/login", function (req, res, next) {
    auth.onAuthStateChanged((user) => {
        if (user) {
            // user is logged in, redirect to home page
            res.redirect("/");
        } else {
            res.render("login", { title: "Login" });
        }
    });
});

/* login the user */
router.post("/login", function (req, res, next) {
    const { email, password } = req.body;

    authentication
        .signInWithEmailAndPassword(auth, email, password)
        .then(() => {
            const token = jwt.sign({ email }, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: "4h",
            });

            // Set the token as a cookie in the response
            const cookieOptions = {
                maxAge: 3600000, // Expiration time in milliseconds
                httpOnly: true, // Cookie cannot be accessed via JavaScript
            };

            res.cookie("authentication_status", token, cookieOptions);

            res.redirect("/");
        })
        .catch((e) => {
            console.error(e);
            res.render("login", { title: "Login", message: "Login fail" });
        });
});

/* GET signup page. */
router.get("/signup", function (req, res, next) {
    auth.onAuthStateChanged((user) => {
        if (user) {
            // user is logged in, redirect to home page
            res.redirect("/");
        } else {
            res.render("signup", { title: "Sign up" });
        }
    });
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

router.get("/logout", function (req, res, next) {
    try {
        authentication.signOut(auth);

        res.redirect("/");
    } catch (e) {
        console.error(e);

        res.redirect("/");
    }
});

module.exports = router;
