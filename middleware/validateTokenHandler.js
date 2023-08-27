const jwt = require("jsonwebtoken");

const validateToken = (req, res, next) => {
    let cookie = req.headers.cookie;
    if (!cookie || !cookie.startsWith("authentication_status")) {
        res.status(401);
        //return res.send("User is not authorized");
        res.redirect("/user/login");
    }

    const token = cookie.split("=")[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            res.status(401);
            return res.send("User is not authorized");
        }
        req.user = decoded.user;
        next();
    });
};

module.exports = { validateToken };
