const { User } = require("../model");
const jwt = require("jsonwebtoken");

const privateKey = process.env.privateKey;

function checkAccount(req, res, next) {
    try {
        const token = req.session.token;
        if (!token)
            return res.redirect("/login")
                // const result = jwt.verify(token, privateKey);
                // const user = User.findOne({ password: token });
                // if (user.username == result)
        return next();
    } catch (e) {
        return res.status(400).json(e);
    }
}

module.exports = { checkAccount }