const { User } = require("../model");
const jwt = require("jsonwebtoken");

const privateKey = process.env.privateKey;

function checkAccount(req, res, next) {
    try {
        const token = req.session.token;
        console.log(token)
        if (!token)
            return res.redirect("/login")
        const result = jwt.verify(token, privateKey);
        const user = User.findOne({ username: result.username });
        if(user)
            return next();
        return res.redirect('/login')
    } catch (e) {
        return res.status(400).json(e);
    }
}

module.exports = { checkAccount }