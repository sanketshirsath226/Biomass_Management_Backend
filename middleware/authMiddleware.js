// middleware/authMiddleware.js
const {verify} = require("jsonwebtoken");

/*
    The authMiddleware function is used to verify the token used for
    requesting the server.

    Header :
    x-auth-token : token

    Status Code :
    403 : {message : Unauthorized}
    401 : {message : Invalid Token}

*/

const authMiddleware = (req, res, next) => {
    try {
        const token = req.header("x-auth-token");
        if (!token) return res.status(403).json({ message: 'Unauthorized'});
        const decoded = verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid Token' });
    }
};
module.exports = authMiddleware