const express = require("express");
const router = express.Router();

/* GET login page. */
router.get("/login", function (req, res, next) {
    res.render("login", { title: "Login" });
});

/* GET signup page. */
router.get("/signup", function (req, res, next) {
    res.render("signup", { title: "Sign up" });
});

module.exports = router;
