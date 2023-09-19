const jwt = require("jsonwebtoken");

const validateToken = (req, res, next) => {
    let cookie = req.headers.cookie;
    let cookieKeyVals = cookie.split("; ");
    let verified = false;

    // Iterate through the cookie pairs to find authentication_status
    for (const keyVal of cookieKeyVals) {
        let [key, value] = keyVal.split("=");
        if (key === "authentication_status") {
            jwt.verify(
                value,
                process.env.ACCESS_TOKEN_SECRET,
                (err, decoded) => {
                    if (err) {
                        res.status(401);
                        return res.send("User is not authorized");
                    }
                    req.user = decoded.user;
                    verified = true;
                    next();
                    return;
                }
            );
        }
    }

    if (!verified) {
        res.status(401);
        return res.send("User is not authorized");
        //res.redirect("/user/login");
    } else {
    }
};

module.exports = { validateToken };
