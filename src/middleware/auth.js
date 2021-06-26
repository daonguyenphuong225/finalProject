const { User } = require("../model");
const jwt = require("jsonwebtoken");

const privateKey = process.env.privateKey;

function checkAcount(req, res) {
    try {
        const token = req.session.token;
        const user = User.findOne({ token });
        const result = jwt.verify(token, privateKey);
        if (user.username == result)
            return next();
        return res.redirect("/login")
    } catch (e) {
        return res.status(400).json(err);
    }
}

module.exports = { checkAcount }