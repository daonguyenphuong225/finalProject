const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const salt = bcrypt.genSaltSync(10);
const privateKey = "secretKey";

exports.hashPassword = (rawPassword) => {
    return bcrypt.hashSync(rawPassword, salt);
};

exports.comparePassword = (rawPassword, hashedPassword) => {
    const match = bcrypt.compareSync(rawPassword, hashedPassword);
    return match;
};

exports.validateToken = () => {};

exports.generateToken = (user) => {
    const token = jwt.sign(user, privateKey);
    return token;
};