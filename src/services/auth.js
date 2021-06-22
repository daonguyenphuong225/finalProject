const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const salt = bcrypt.genSaltSync(10);

const privateKey = process.env.privateKey;

exports.hashPassword = (rawPassword) => {
    return bcrypt.hashSync(rawPassword, salt);
};

exports.comparePassword = (rawPassword, hashedPassword) => {
    const match = bcrypt.compareSync(rawPassword, hashedPassword);
    return match;
};

exports.generateToken = (user) => {
    const token = jwt.sign(user, privateKey);
    return token;
};