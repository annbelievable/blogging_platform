const jwt = require("jsonwebtoken");

const validateToken = (req, res, next) => {
    let authHeader = req.headers["authorization"];
    if (authHeader && authHeader.startsWith("Bearer")) {
        token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                res.status(401);
                throw new Error("User is not authorized");
            }
            req.user = decoded.user;
            next();
        });
    }
};

module.exports = { validateToken };
