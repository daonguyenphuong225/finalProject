const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const salt = bcrypt.genSaltSync(10);

const privateKey = process.env.privateKey;

exports.hashPassword = async (rawPassword) => {
    return await bcrypt.hashSync(rawPassword, salt);
};

exports.comparePassword = async (rawPassword, hashedPassword) => {
    const match = await bcrypt.compareSync(rawPassword, hashedPassword);
    return match;
};

exports.generateToken = (user) => {
    const token = jwt.sign(user, privateKey);
    return token;
};